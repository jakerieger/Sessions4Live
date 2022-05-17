<template>
  <div class="host">
    <h1>Host</h1>
    <br/><br/>
    <InputWithLabel :icon="true" label="power-plug" :value="hostPort.toString()"/>
    <br/>
    <div id="project-dir">
      <InputWithLabel :icon="true" label="folder" placeholder="Project directory" :value="hostProject"/>
      <button class="secondary" @click="browseProject">...</button>
    </div>
    <br/><br/>
    <button class="primary" @click="startServer">Start Server</button>
    <br/>
    <button class="secondary" @click="getDiff">Get Diff</button>
    <br/>
    <button class="secondary" @click="onBack">Back</button>
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import * as VersionControl from '../versionControl';

import InputWithLabel from '@/components/InputWithLabel.vue';

export default {
  name: 'Host',
  props: ['pid'],
  components: {
    InputWithLabel,
  },
  data: () => ({
    hostPort: 5000,
    hostProject: '',
    projectFileArchive: '',
    S4LDir: '',
    serverRunning: false
  }),
  mounted() {
    ipcRenderer.on('server-started', (event, arg) => {
      this.serverRunning = true;
    });

    ipcRenderer.on('server-stopped', (event, arg) => {
      this.serverRunning = false;
    });
  },
  methods: {
    onBack() {
      this.$router.push('/', { replace: true });
    },

    async startServer() {
      if (!fs.existsSync(path.join(this.hostProject, 'S4L'))) {
        fs.mkdirSync(path.join(this.hostProject, 'S4L'));
      }

      this.S4LDir = path.join(this.hostProject, 'S4L');

      await VersionControl.initRepo(this.hostProject);
      await VersionControl.addProjectFile(this.hostProject);
      await VersionControl.commitProjectFile(this.hostProject, 'Initial commit');
      // await VersionControl.pushProjectFile(this.hostProject);

      ipcRenderer.send('start-server', {
        port: this.hostPort,
        project: this.hostProject,
        projectFileArchive: this.projectFileArchive,
        S4LDir: this.S4LDir,
        pid: this.pid
      });
    },

    getDiff() {
      VersionControl.getDiff(this.S4LDir);
      console.log('this should have gotten the diff');
    },

    browseProject() {
      const projectDir = remote.dialog.showOpenDialogSync({
        properties: ['openDirectory'],
      });

      if (projectDir) {
        this.hostProject = projectDir[0];
      }
    },
  }
}
</script>

<style>
#project-dir {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#project-dir div:first-child {
  flex: 1;
  height: 100%;
}

#project-dir button {
  /* flex: 1; */
  width: 56px;
  margin-left: 8px;
}
</style>