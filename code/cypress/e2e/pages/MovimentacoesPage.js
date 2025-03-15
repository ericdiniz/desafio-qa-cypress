class MovimentacoesPage {
    visit() {
        cy.visit('https://seubarriga.wcaquino.me/movimentacao');
    }

    criarMovimentacao(tipo, descricao, valor, conta, interessado, dataTransacao, dataPagamento, situacao) {
        cy.get('#tipo').select(tipo);
        cy.get('#data_transacao').type(dataTransacao);
        cy.get('#data_pagamento').type(dataPagamento);
        cy.get('#descricao').type(descricao);
        cy.get('#interessado').type(interessado);

        cy.get('#valor').type(valor);

        cy.get('#conta').then(($select) => {
            const options = $select.find('option').toArray().map((option) => option.textContent.trim());
            if (options.includes(conta)) {
                cy.get('#conta').select(conta);
            } else {
                throw new Error(`Conta "${conta}" não encontrada no select. Opções disponíveis: ${options.join(', ')}`);
            }
        });

        if (situacao === 'Pago') {
            cy.get('#status_pago').check();
        } else {
            cy.get('#status_pendente').check();
        }

        cy.get('.btn').contains('Salvar').click();
    }

    validarMensagemSucesso(mensagem) {
        cy.get('.alert').should('contain', mensagem);
    }

    validarMensagemErro(mensagem) {
        cy.get('.alert').should('contain', mensagem);
    }

    validarCampoValorInvalido() {
        cy.contains('Valor deve ser um número').should('be.visible');
    }
}

export default new MovimentacoesPage();