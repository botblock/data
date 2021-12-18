const { promises: { readdir } } = require('fs');
const { join } = require('path');

const getDirectories = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));

const getFiles = source => readdir(source, { withFileTypes: true })
    .then(data => data.filter(dirent => dirent.isFile()).map(dirent => dirent.name));

describe('repository', () => {
    test('contains data, schema and validate directories', async () => {
        // Get directories
        const directories = await getDirectories(join(__dirname, '..'));

        // Filter out known things to ignore
        const filtered = directories.filter(dir => ![
            '.git',
            '.idea',
            '.vscode',
            'node_modules',
        ].includes(dir));

        // Check only expected directories are present
        expect(filtered.sort()).toEqual([
            'data',
            'schema',
            'validate',
        ].sort());
    });

    test('contains root metadata files', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..'));

        // Check only expected files are present
        expect(files.sort()).toEqual([
            '.editorconfig',
            '.gitignore',
            '.nvmrc',
            'LICENSE',
            'openapi.yml',
            'package.json',
            'package-lock.json',
            'README.md',
        ].sort());
    });
});

describe('data directory', () => {
    test('contains features, libraries and lists directories', async () => {
        // Get directories
        const directories = await getDirectories(join(__dirname, '..', 'data'));

        // Check only expected directories are present
        expect(directories.sort()).toEqual([
            'features',
            'libraries',
            'lists',
        ].sort());
    });

    test('contains single legacy map file', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..', 'data'));

        // Check only expected files are present
        expect(files.sort()).toEqual([
            'legacy.json',
        ].sort());
    });

    describe('features subdirectory', () => {
        test('contains no directories', async () => {
            // Get directories
            const directories = await getDirectories(join(__dirname, '..', 'data', 'features'));
            expect(directories.length).toEqual(0);
        });

        test('contains only json files', async () => {
            // Get files
            const files = await getFiles(join(__dirname, '..', 'data', 'features'));

            // Check all files are json
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            expect(files.length).toEqual(jsonFiles.length);
        });
    });

    describe('libraries subdirectory', () => {
        test('contains no directories', async () => {
            // Get directories
            const directories = await getDirectories(join(__dirname, '..', 'data', 'libraries'));
            expect(directories.length).toEqual(0);
        });

        test('contains only json files', async () => {
            // Get files
            const files = await getFiles(join(__dirname, '..', 'data', 'libraries'));

            // Check all files are json
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            expect(files.length).toEqual(jsonFiles.length);
        });
    });

    describe('lists subdirectory', () => {
        test('contains no directories', async () => {
            // Get directories
            const directories = await getDirectories(join(__dirname, '..', 'data', 'lists'));
            expect(directories.length).toEqual(0);
        });

        test('contains only json files', async () => {
            // Get files
            const files = await getFiles(join(__dirname, '..', 'data', 'lists'));

            // Check all files are json
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            expect(files.length).toEqual(jsonFiles.length);
        });
    });
});

describe('schema directory', () => {
    test('contains no directories', async () => {
        // Get directories
        const directories = await getDirectories(join(__dirname, '..', 'schema'));
        expect(directories.length).toEqual(0);
    });

    test('contains required json schema files', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..', 'schema'));

        // Check only expected files are present
        expect(files.sort()).toEqual([
            'feature.json',
            'legacy.json',
            'library.json',
            'list.json',
        ].sort());
    });
});

describe('validate directory', () => {
    test('contains no directories', async () => {
        // Get directories
        const directories = await getDirectories(join(__dirname, '..', 'validate'));
        expect(directories.length).toEqual(0);
    });

    test('contains required test files', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..', 'validate'));

        // Check only expected files are present
        expect(files.sort()).toEqual([
            'data.test.js',
            'files.test.js',
            'schemas.test.js',
        ].sort());
    });
});
