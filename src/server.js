const express = require('express');

class ServerManager {
    constructor(port, directory) {
        this.port = port;
        this.directory = directory;
        this.server = null;
        this.app = express();

        this.app.use(express.static(this.directory));
    }

    Start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

    Stop() {
        this.server.close();
    }
}

module.exports = { ServerManager };