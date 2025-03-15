// cypress/e2e/specs/resumoMensal.cy.js

import LoginPage from '../pages/LoginPage';
import ResumoMensalPage from '../pages/ResumoMensalPage';

describe('Resumo Mensal', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fazerLogin('usuario_teste6@exemplo.com', 'senha123');
    });

    it('Deve filtrar as movimentações por mês e ano', () => {
        ResumoMensalPage.visit();
        ResumoMensalPage.filtrarMovimentacoes('Março', '2025');

        cy.get('tbody tr').should('have.length.greaterThan', 0);
    });

    it('Deve excluir uma movimentação', () => {
        ResumoMensalPage.visit();
        cy.pause()
        ResumoMensalPage.filtrarMovimentacoes('Março', '2025');
        ResumoMensalPage.excluirMovimentacao();
        ResumoMensalPage.validarMensagemSucesso('Movimentação removida com sucesso!');
    });
});