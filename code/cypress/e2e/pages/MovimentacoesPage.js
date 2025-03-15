class MovimentacoesPage {
    visit() {
        cy.visit('https://seubarriga.wcaquino.me/movimentacao');
    }

    criarMovimentacao(descricao, valor, conta, interessado) {
        const dataAtual = new Date().toLocaleDateString('pt-BR');

        cy.get('#tipo').select('Receita');
        cy.get('#data_transacao').type(dataAtual);
        cy.get('#data_pagamento').type(dataAtual);
        cy.get('#descricao').type(descricao);
        cy.get('#valor').type(valor);
        cy.get('#conta').select(conta);
        cy.get('#status_pago').check();
        cy.get('#interessado').type(interessado);

        cy.get('.btn').contains('Salvar').click();
    }

    validarMensagemSucesso(mensagem) {
        cy.get('.alert').should('contain', mensagem);
    }
}

export default new MovimentacoesPage();