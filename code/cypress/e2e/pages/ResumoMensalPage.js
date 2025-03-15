class ResumoMensalPage {
    visit() {
        cy.visit('https://seubarriga.wcaquino.me/extrato');
    }

    filtrarMovimentacoes(mes, ano) {
        cy.get('#mes').then(($select) => {
            const options = $select.find('option').toArray().map((option) => option.textContent.trim());
            if (options.includes(mes)) {
                cy.get('#mes').select(mes);
            } else {
                throw new Error(`Mês "${mes}" não encontrado no select. Opções disponíveis: ${options.join(', ')}`);
            }
        });

        cy.get('#ano').then(($select) => {
            const options = $select.find('option').toArray().map((option) => option.textContent.trim());
            if (options.includes(ano)) {
                cy.get('#ano').select(ano);
            } else {
                throw new Error(`Ano "${ano}" não encontrado no select. Opções disponíveis: ${options.join(', ')}`);
            }
        });

        cy.get('input[value="Buscar"]').click();
    }

    excluirMovimentacao() {
        cy.get(':nth-child(1) > :nth-child(6) > a > .glyphicon').click();
    }

    validarMensagemSucesso(mensagem) {
        cy.contains(mensagem).should('be.visible');
    }
}

export default new ResumoMensalPage();