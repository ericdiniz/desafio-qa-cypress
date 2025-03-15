class ContasPage {
    visit() {
        cy.visit('https://seubarriga.wcaquino.me/contas');
    }

    adicionarConta(nome) {
        cy.get('.dropdown-toggle').click();
        cy.contains('Adicionar').click();
        cy.get('#nome').type(nome);
        cy.contains('Salvar').click();
    }

    listarContas() {
        return cy.get('table tbody tr');
    }

    alterarNomeConta(nomeAntigo) {
        const numeroAleatorio = Math.floor(Math.random() * 100);
        const caracteresEspeciais = ['@', '#', '$', '%', '&'];
        const caractereAleatorio = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
        const nomeNovo = `Editado ${numeroAleatorio}${caractereAleatorio}`;

        cy.contains('table tbody tr', nomeAntigo)
            .within(() => {
                cy.get('[href*="/editarConta"] > .glyphicon').click();
            });

        cy.get('#nome').clear().type(nomeNovo);
        cy.get('.btn').contains('Salvar').click();
        cy.get('.alert').should('contain', 'Conta alterada com sucesso!');
        return nomeNovo;
    }

    excluirConta(nome) {
        cy.contains('table tbody tr', nome)
            .within(() => {
                cy.get('[href*="/removerConta"] > .glyphicon').click();
            });
    }

    validarMensagemSucesso(mensagem) {
        cy.contains(mensagem).should('be.visible');
    }

    validarMensagemErro(mensagem) {
        cy.contains(mensagem).should('be.visible');
    }
}

export default new ContasPage();