import ContasPage from '../pages/ContasPage';
import LoginPage from '../pages/LoginPage';
import MovimentacoesPage from '../pages/MovimentacoesPage';
import gerarNomeUnico from '../support/incrementarNomeDaConta';

describe('Fluxo de Criar Movimentação', () => {
    const nomeBase = 'Conta Movimentações';

    before(() => {
        cy.task('atualizarContador', { contador: 240 });
    });

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fazerLogin('usuario_teste6@exemplo.com', 'senha123');
    });

    it('Deve criar no mínimo 2 movimentações (Receita e Despesa)', () => {
        ContasPage.visit();
        gerarNomeUnico(nomeBase).then((nomeConta1) => {
            ContasPage.adicionarConta(nomeConta1);
            ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
        });
        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Teste 315', 'Empresa XYZ', '12/03/2025', '12/03/2025', 'Pago');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Teste 315', 'Proprietário', '15/03/2025', '15/03/2025', 'Pendente');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
    });

    it('Deve criar no mínimo 2 movimentações para cada conta', () => {

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 701', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 705', 'Proprietário', '10/03/2025', '10/03/2025', 'Pendente');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
    });

    it('Deve criar no mínimo 2 movimentações para cada situação', () => {

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Teste 315', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Teste 335', 'Proprietário', '10/03/2025', '10/03/2025', 'Pendente');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
    });

    it('Deve criar no mínimo 2 movimentações para meses diferentes', () => {
        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 611', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

        MovimentacoesPage.visit();
        MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 601', 'Proprietário', '15/02/2025', '15/02/2025', 'Pendente');
        MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
    });

    it('Deve validar os campos de data', () => {
        MovimentacoesPage.visit();

        cy.get('#data_transacao').type('data inválida');
        cy.get('#data_pagamento').type('data inválida');
        cy.get('.btn').contains('Salvar').click();

        cy.contains('Data da Movimentação inválida (DD/MM/YYYY)').should('be.visible');
        cy.contains('Data da Movimentação deve ser menor ou igual à data atual').should('be.visible');
        cy.contains('Data do pagamento inválida (DD/MM/YYYY)').should('be.visible');
    });

    it('Deve validar o campo valor', () => {
        MovimentacoesPage.visit();
        cy.get('#valor').type('valor inválido');
        cy.get('.btn').contains('Salvar').click();
        MovimentacoesPage.validarCampoValorInvalido();
    });
});