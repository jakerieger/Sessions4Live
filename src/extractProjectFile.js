const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const isDevelopment = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

module.exports = {
    extractProjectFile: function(projPath) {
        if (isMac) {
            //
            const sevenZipPath = isDevelopment ? path.join(__dirname, '../../../../../../../../utils/7zz') : path.join(__dirname, '../utils/7zz');
            const result = execFileSync(sevenZipPath, ['x', `${projPath}`, `-o${path.join(projPath, '..')}`]);

            if (result instanceof Error) {
                throw result;
            } else {
                fs.renameSync(projPath.split('.')[0], projPath.split('.')[0] + '.xml');
            }
        } else {
            const sevenZipPath = isDevelopment ? path.join(__dirname, '../../../../../../../../utils/7za.exe') : path.join(__dirname, '../utils/7za.exe');
        }
    }
}