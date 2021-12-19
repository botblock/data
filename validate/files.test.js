const { join } = require('path');
const { exec } = require('child_process');
const { getDirectories, getFiles } = require('./util');

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
            '.github',
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

    test('complies with editorconfig', async () => {
        // Run editorconfig
        const editorconfig = await new Promise(resolve => exec(
            './node_modules/.bin/editorconfig-checker',
            { cwd: join(__dirname, '..') },
            (error, stdout, stderr) => resolve({ error, stdout, stderr }),
        ));

        // Log output if errored
        if (editorconfig.error) {
            console.log(editorconfig.stdout);
            console.error(editorconfig.stderr);
        }

        // Expect no errors
        expect(editorconfig.error).toBeNull();
    });
});

describe('.github directory', () => {
    test('contains workflows directory', async () => {
        // Get directories
        const directories = await getDirectories(join(__dirname, '..', '.github'));

        // Check only expected directories are present
        expect(directories.sort()).toEqual([
            'workflows',
        ].sort());
    });

    test('contains no files', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..', '.github'));
        expect(files).toEqual([]);
    });

    describe('workflows subdirectory', () => {
        test('contains no directories', async () => {
            // Get directories
            const directories = await getDirectories(join(__dirname, '..', '.github', 'workflows'));
            expect(directories).toEqual([]);
        });

        test('contains ci workflow file', async () => {
            // Get files
            const files = await getFiles(join(__dirname, '..', '.github', 'workflows'));

            // Check only expected files are present
            expect(files.sort()).toEqual([
                'deploy.yml',
                'test.yml',
            ].sort());
        });
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
            expect(directories).toEqual([]);
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
            expect(directories).toEqual([]);
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
            expect(directories).toEqual([]);
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
        expect(directories).toEqual([]);
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
        expect(directories).toEqual([]);
    });

    test('contains required test files', async () => {
        // Get files
        const files = await getFiles(join(__dirname, '..', 'validate'));

        // Check only expected files are present
        expect(files.sort()).toEqual([
            'data.test.js',
            'files.test.js',
            'schemas.test.js',
            'util.js',
        ].sort());
    });
});
