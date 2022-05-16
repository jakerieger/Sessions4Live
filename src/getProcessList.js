const util = require('util');
const exec = util.promisify(require('child_process').exec)

async function windows() {

}

async function darwin() {
    const procs = [];

    const { stdout } = await exec('ps -ax -o pid,args');
    const lines = stdout.trim().split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const pid = line.split(' ')[0];
        const args = line.split(' ').slice(1).join(' ');
        procs.push({ pid, args });
    }

    return procs;
}

module.exports = {
    getProcessList: async () => {
        if (process.platform === 'win32') {
            return await windows();
        } else {
            return await darwin();
        }
    }
};