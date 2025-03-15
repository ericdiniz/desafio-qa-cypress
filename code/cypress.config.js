const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readUsuariosJson() {
          const filePath = path.join(__dirname, 'cypress/e2e/fixtures/usuarios.json');
          const data = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(data);
        },

        writeUsuariosJson({ email }) {
          const filePath = path.join(__dirname, 'cypress/e2e/fixtures/usuarios.json');
          const data = fs.readFileSync(filePath, 'utf8');
          const usuarios = JSON.parse(data);
          usuarios.email = email;
          fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
          return null;
        },

        lerContador() {
          const filePath = path.join(__dirname, 'cypress/e2e/fixtures/contador.json');
          const data = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(data);
        },

        atualizarContador({ contador }) {
          const filePath = path.join(__dirname, 'cypress/e2e/fixtures/contador.json');
          const data = fs.readFileSync(filePath, 'utf8');
          const contadorData = JSON.parse(data);
          contadorData.contador = contador;
          fs.writeFileSync(filePath, JSON.stringify(contadorData, null, 2));
          return null;
        },
      });
    },
  },
});