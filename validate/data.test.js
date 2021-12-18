const { join } = require('path');
const { loadJson, validateJsonFiles, loadValidJsonFiles } = require('./util');

describe('legacy data', () => {
    // TODO: Is a valid JSON file

    test('is valid against schema', async () => {
        // Get the file and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data'))
            .then(valid => valid.filter(({ file }) => file === 'legacy.json'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'legacy.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    // TODO: Each key is unique
    // TODO: Each value is a valid list
});

describe('features data', () => {
    // TODO: Are valid JSON files

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'features'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'feature.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    // TODO: Each id matches file name
});

describe('libraries data', () => {
    // TODO: Are valid JSON files

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'libraries'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'library.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    // TODO: Each sluggified repo matches file name
});

describe('lists data', () => {
    // TODO: Are valid JSON files

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'lists'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'list.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    // TODO: Each id matches file name
    // TODO: Each feature in each file is a valid feature
    // TODO: Owners field is formatted correctly
});
