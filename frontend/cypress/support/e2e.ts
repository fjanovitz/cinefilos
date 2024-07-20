// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "@cypress/code-coverage/support";


const dbPath = "../backend/src/db/database.json";


var data_db;

function saveBackup() {
  cy.readFile(dbPath).then((data) => {
    data_db = data;
  });
}

beforeEach(() => {
    saveBackup();
});

afterEach(() => {
    cy.writeFile(dbPath, data_db);
});

