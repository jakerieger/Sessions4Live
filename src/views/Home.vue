<template>
  <div class="home">
    <div id="header">
      <img src="@/assets/logo.png" alt="logo" width="60%" />
      <br/>
      <h1>Sessions4Live</h1>
      <div class="connection-status"><span :id="connectionStatus === 'running' ? 'connected' : 'not-connected'">•</span> {{ connectionStatus === 'running' ? 'Ableton is running' : 'Ableton not running' }}</div>
    </div>
    <div id="main-menu">
      <button class="primary" @click="onHost">Host</button>
      <br/>
      <button class="secondary" @click="onJoin">Join</button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'Home',
  data: () => ({
    connectionStatus: 'not-running',
    abletonProcessID: 0,
  }),
  mounted() {
    ipcRenderer.on('ableton-running', (event, procId) => {
      this.connectionStatus = 'running';
      this.abletonProcessID = procId;
    });
    ipcRenderer.on('ableton-not-running', () => {
      this.connectionStatus = 'not-running';
    });
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners('ableton-running');
    ipcRenderer.removeAllListeners('ableton-not-running');
  },
  beforeCreate() {
    ipcRenderer.send('get-connection-status');
  },
  methods: {
    onHost() {
      this.$router.push(`/host/${this.abletonProcessID}`, { replace: true });
    },

    onJoin() {
      this.$router.push(`/join/${this.abletonProcessID}`, { replace: true });
    }
  }
}
</script>
