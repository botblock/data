const { join } = require('path');
const Ajv = require('ajv');
const SwaggerParser = require('@apidevtools/swagger-parser');
const { loadInvalidJsonFiles, loadValidJsonFiles } = require('./util');

describe('openapi schema', () => {
    test('is a valid openapi schema', async () => {
        // Load and parse the schema
        const errors = await SwaggerParser.validate(join(__dirname, '..', 'openapi.yml')).then(() => null, err => err);

        // Expect no errors
        expect(errors).toBeNull();
    });
});

describe('json schemas', () => {
    test('are valid json files', async () => {
        // Get invalid json files
        const failures = await loadInvalidJsonFiles(join(__dirname, '..', 'schema'));

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('are valid json schemas', async () => {
        // Get valid json files
        const valid = await loadValidJsonFiles(join(__dirname, '..', 'schema'));

        // Validate schemas
        const ajv = new Ajv();
        const failures = valid.map(({ file, data }) => {
            try {
                const valid = ajv.validateSchema(data);
                const errors = ajv.errors;
                return { file, valid, errors };
            } catch (err) {
                return { file, valid: false, errors: err.message };
            }
        }).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });
});
