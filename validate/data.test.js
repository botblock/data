const { join } = require('path');
const { loadInvalidJsonFiles, loadJson, validateJsonFiles, loadValidJsonFiles } = require('./util');

describe('legacy data', () => {
    test('is a valid json file', async () => {
        // Get invalid json files
        const failures = await loadInvalidJsonFiles(join(__dirname, '..', 'data'))
            .then(invalid => invalid.filter(({ file }) => file === 'legacy.json'));

        // Expect no errors
        expect(failures).toEqual([]);
    });

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

    test('contains valid list ids', async () => {
        // Get the file
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data'))
            .then(valid => valid.filter(({ file }) => file === 'legacy.json'));

        // If invalid, don't test
        if (!files.length) return;

        // Get all valid lists
        const listsFiles = await loadValidJsonFiles(join(__dirname, '..', 'data', 'lists'));
        const lists = listsFiles.map(({ data }) => data.id);

        // Get non-existent lists
        const missing = Object.values(files[0].data).filter(id => !lists.includes(id));

        // Expect no missing lists
        expect(missing).toEqual([]);
    });
});

describe('features data', () => {
    test('are valid json files', async () => {
        // Get invalid json files
        const failures = await loadInvalidJsonFiles(join(__dirname, '..', 'data', 'features'));

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'features'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'feature.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('have file names that match ids', async () => {
        // Get the files
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'features'));

        // Get mis-matches
        const mismatches = files.filter(({ file, data }) => file !== `${data.id}.json`);

        // Expect no mis-matches
        expect(mismatches).toEqual([]);
    });
});

describe('libraries data', () => {
    test('are valid json files', async () => {
        // Get invalid json files
        const failures = await loadInvalidJsonFiles(join(__dirname, '..', 'data', 'libraries'));

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'libraries'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'library.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('have file names that match sluggified repos', async () => {
        // Get the files
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'libraries'));

        // Get mis-matches
        const sluggify = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const mismatches = files.filter(({ file, data }) => file !== `${sluggify(data.repo)}.json`);

        // Expect no mis-matches
        expect(mismatches).toEqual([]);
    });
});

describe('lists data', () => {
    test('are valid json files', async () => {
        // Get invalid json files
        const failures = await loadInvalidJsonFiles(join(__dirname, '..', 'data', 'lists'));

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('are valid against schema', async () => {
        // Get the files and schema
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'lists'));
        const schema = await loadJson(join(__dirname, '..', 'schema', 'list.json'));

        // Get failures
        const failures = validateJsonFiles(files, schema).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('have file names that match ids', async () => {
        // Get the files
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'lists'));

        // Get mis-matches
        const mismatches = files.filter(({ file, data }) => file !== `${data.id}.json`);

        // Expect no mis-matches
        expect(mismatches).toEqual([]);
    });

    test('contain valid features', async () => {
        // Get the files
        const files = await loadValidJsonFiles(join(__dirname, '..', 'data', 'lists'));

        // Get all valid features
        const featuresFiles = await loadValidJsonFiles(join(__dirname, '..', 'data', 'features'));
        const features = featuresFiles.map(({ data }) => data.id);

        // Get lists that have invalid features
        const failures = files.filter(({ data }) => data.features.some(id => !features.includes(id)));

        // Expect no errors
        expect(failures).toEqual([]);
    });
});
