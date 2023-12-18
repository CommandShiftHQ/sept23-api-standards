const express = require('express');
const swaggerDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Set up Swagger Options
const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'CommandShift Cohorts Greetings',
        version: '18.12.2023',
        description: "Hello greetings for different bootcamp cohorts"
      },
    },
    // Remember to change this to match the files where the endpoint definitions should be found.
    // They can be hardcoded or you can use wildcard to match on multiple paths e.g. ./src/*.js
    apis: ['./index.js'],
  };
 
// Link up API Specfications with Swagger and the path to serve the documentation
const openapiSpecification = swaggerDocs(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());

app.get("/", (_, response) => { 
    response.send();
});

// Stateful examples - where the logic
app.get("/v1/hellosept23", (request, response) => {
    response.status(200).send("Hello, Sept2023!");
})

app.get("/v1/hellojan24", (request, response) => {
    response.status(200).send("Hello, Jan2024!");
})

// Stateless examples - where the logic does not make assumption / has hardcoded values
// Documented API using OpenApi and presented by Swagger
// Versioned Routes following best practices (lowercase naming)

/**
 * @openapi
 * /v1/hello/:cohort:
 *   get:
 *     description: Returns a string with a cohort
 *     responses:
 *       200:
 *         description: Returns a successful response with a short greeting for passed cohort name.
 *       400:
 *         description: The request was wrong.
 */

app.get("/v1/cohorts/:cohort/hello", (request, response) => {
    const cohortValue = request.params.cohort;
    response.status(200).send(`Hello, ${cohortValue}!`);
})

/**
 * @openapi
 * /v2/hello/:cohort:
 *   get:
 *     description: Returns a long hello string with a cohort
 *     responses:
 *       200:
 *         description: Returns a successful response with a long greetings for passed cohort name.
 *       400:
 *         description: The request was wrong. 
 */

app.get("/v2/cohorts/:cohort/hello", (request, response) => {
    const cohortValue = request.params.cohort;
    response.status(200).send(`Greetings fellow one, you belong to the ${cohortValue} cohort, are you not?!`);
})

app.listen(3000, () => { console.log("Server is running on port 3000") });