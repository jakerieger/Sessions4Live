<template>
  <div class="host">
    <div id="header">
      <h1>Host</h1>
    </div>
    <div id="main-menu">
      <InputWithLabel label="Port" :value="hostPort"/>
      <br/>
      <div id="project-dir">
        <InputWithLabel label="Project" :value="hostProject"/>
        <button class="secondary" @click="browseProject">...</button>
      </div>
      <br/><br/>
      <button class="primary" @click="startServer">Start Server</button>
      <br/>
      <button class="secondary" @click="onBack">Back</button>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import { extractProjectFile } from '../extractProjectFile';

import InputWithLabel from '@/components/InputWithLabel.vue';

export default {
  name: 'Host',
  props: ['pid'],
  components: {
    InputWithLabel,
  },
  data: () => ({
    hostPort: 8080,
    hostProject: '',
    projectFileArchive: '',
    serverRunning: false
  }),
  mounted() {
    ipcRenderer.on('server-started', (event, arg) => {
      this.serverRunning = true;
    });
  },
  methods: {
    onBack() {
      this.$router.push('/', { replace: true });
    },

    startServer() {
      if (!fs.existsSync(path.join(this.hostProject, 'S4L'))) {
        fs.mkdirSync(path.join(this.hostProject, 'S4L'));
      }

      const files = fs.readdirSync(this.hostProject);
      for (const file of files) {
        if (file.endsWith('.als')) {
          fs.copyFileSync(path.join(this.hostProject, file), path.join(this.hostProject, 'S4L', file));
          fs.renameSync(path.join(this.hostProject, 'S4L', file), path.join(this.hostProject, 'S4L', file.split('.')[0] + '.7z'));
          this.projectFileArchive = path.join(this.hostProject, 'S4L', file.split('.')[0] + '.7z');
        }
      }

      extractProjectFile(this.projectFileArchive);

      ipcRenderer.send('start-server', {
        port: this.hostPort,
        project: this.hostProject,
        projectFileArchive: this.projectFileArchive,
        pid: this.pid
      });
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