function gerarNomeUnico(nomeBase) {
    return new Cypress.Promise((resolve) => {
        cy.task('lerContador').then((contadorData) => {
            let contador = contadorData.contador;
            contador += 1;

            cy.task('atualizarContador', { contador }).then(() => {
                resolve(`${nomeBase} ${contador}`);
            });
        });
    });
}

module.exports = gerarNomeUnico;