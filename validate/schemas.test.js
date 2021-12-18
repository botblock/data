const { join } = require('path');
const Ajv = require('ajv');
const SwaggerParser = require('@apidevtools/swagger-parser');
const { getFiles, loadJson } = require('./util');

describe('openapi schema', () => {
    test('is a valid openapi schema', async () => {
        // Load and parse the schema
        const errors = await SwaggerParser.validate(join(__dirname, '..',  'openapi.yml')).then(() => null, err => err);

        // Expect no errors
        expect(errors).toBeNull();
    });
});

describe('json schemas', () => {
    test('are valid json files', async () => {
        // Get json schemas
        const schemas = await getFiles(join(__dirname, '..', 'schema'))
            .then(files => files.filter(file => file.endsWith('.json')));

        // Attempt to read and parse each schema file
        const failures = await Promise.all(schemas
            .map(schema => loadJson(join(__dirname, '..', 'schema', schema))
                .then(() => null, error => ({ schema, error }))))
            .then(results => results.filter(res => res !== null));

        // Expect no errors
        expect(failures).toEqual([]);
    });

    test('are valid json schemas', async () => {
        // Get json schemas
        const schemas = await getFiles(join(__dirname, '..', 'schema'))
            .then(files => files.filter(file => file.endsWith('.json')));

        // Get valid json files
        const valid = await Promise.all(schemas
            .map(schema => loadJson(join(__dirname, '..', 'schema', schema))
                .then(data => ({ schema, data }), () => null)))
            .then(results => results.filter(res => res !== null));

        // Validate schemas
        const ajv = new Ajv();
        const failures = valid.map(({ schema, data }) => {
           try {
               const valid = ajv.validateSchema(data);
               const errors = ajv.errorsText(ajv.errors);
               return { schema, valid, errors };
           } catch (err) {
               return { schema, valid: false, errors: err.message };
           }
        }).filter(({ valid }) => !valid);

        // Expect no errors
        expect(failures).toEqual([]);
    });
});
