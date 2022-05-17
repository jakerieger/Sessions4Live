const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const isDevelopment = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";
const gitBinaryName = isMac ? 'git' : 'git.exe';

const gitPath = isDevelopment
    ? path.join(__dirname, `../../../../../../../../utils/${gitBinaryName}`)
    : path.join(__dirname, `../utils/${gitBinaryName}`);

module.exports = {
    initRepo: async function(projPath) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(path.join(projPath, '.gitignore'), '/S4L\n/Backup\n');
            const result = spawn(gitPath, ['init'], { cwd: projPath });
    
            result.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data);
            });

            result.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(code);
            });
        });
    },

    addProjectFile: async function(projPath) {
        return new Promise((resolve, reject) => {
            const result = spawn(gitPath, ['add', '.'], { cwd: projPath });

            result.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data);
            });

            result.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(code);
            });
        });
    },

    commitProjectFile: async function(projPath, commitMessage) {
        return new Promise((resolve, reject) => {
            const result = spawn(gitPath, ['commit', '-m', `"${commitMessage}"`], { cwd: projPath });

            result.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data);
            });

            result.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(code);
            });
        });
    },

    pushProjectFile: async function(projPath) {
        return new Promise((resolve, reject) => {
            const result = spawn(gitPath, ['push'], { cwd: projPath });

            result.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data);
            });

            result.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(code);
            });
        });
    },

    getDiff: async function(projPath) {
        return new Promise((resolve, reject) => {
            const result = spawn(gitPath, ['diff'], { cwd: projPath });

            let diff = '';

            result.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                reject(data.toString());
            });

            result.stdout.on('data', (data) => {
                diff += data.toString();
            });

            result.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(diff);
            });
        });
    },

    applyDiff: function(projPath) {
        const result = spawn(gitPath, ['apply', '--ignore-space-change', '--ignore-whitespace', 'S4L/*.diff'], { cwd: projPath });
    }
}