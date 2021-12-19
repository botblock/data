const { promises: { readdir, readFile } } = require('fs');
const { join } = require('path');
const Ajv = require('ajv');

module.exports.getDirectories = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));

const getFiles = module.exports.getFiles = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isFile()).map(dirent => dirent.name));

const loadJson = module.exports.loadJson = path => readFile(path, 'utf8').then(raw => JSON.parse(raw));

const loadJsonFiles = source => getFiles(source)
    .then(files => Promise.all(files
        .filter(file => file.endsWith('.json'))
        .map(file => loadJson(join(source, file))
            .then(data => ({ file, data }), error => ({ file, error })))));

module.exports.loadInvalidJsonFiles = source => loadJsonFiles(source)
    .then(results => results.filter(({ error }) => !!error));

module.exports.loadValidJsonFiles = source => loadJsonFiles(source)
    .then(results => results.filter(({ error }) => !error));

module.exports.validateJsonFiles = (files, schema) => {
    // Create the validator
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // Validate
    return files.map(({ file, data }) => {
        try {
            const valid = validate(data);
            const errors = validate.errors;
            return { file, valid, errors };
        } catch (err) {
            return { file, valid: false, errors: err.message };
        }
    });
};
