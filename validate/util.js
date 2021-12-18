const { promises: { readdir, readFile } } = require('fs');

module.exports.getDirectories = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));

module.exports.getFiles = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isFile()).map(dirent => dirent.name));

module.exports.loadJson = path => readFile(path, 'utf8').then(raw => JSON.parse(raw));
