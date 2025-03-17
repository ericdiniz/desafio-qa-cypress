import ContasPage from '../pages/ContasPage';
import LoginPage from '../pages/LoginPage';
import MovimentacoesPage from '../pages/MovimentacoesPage';
import { gerarNomeUnicoConta, gerarNomeUnicoMovimentacao } from '../support/incrementarNomeDaConta';

describe('Fluxo de Criar Movimentação', () => {
    const nomeBase = 'Conta Movimentações';

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fazerLogin('usuario_teste6@exemplo.com', 'senha123');
    });

    it('Deve criar no mínimo 2 movimentações (Receita e Despesa)', () => {
        ContasPage.visit();
        gerarNomeUnicoConta(nomeBase).then((nomeConta) => {
            ContasPage.adicionarConta(nomeConta);
            ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
        });

        MovimentacoesPage.visit();
        gerarNomeUnicoMovimentacao(nomeBase).then((nomeMovimentacao) => {
            MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 701', 'Empresa XYZ', '12/03/2025', '12/03/2025', 'Pago');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

            MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 701', 'Proprietário', '15/03/2025', '15/03/2025', 'Pendente');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
        });
    });

    it('Deve criar no mínimo 2 movimentações para cada conta', () => {
        ContasPage.visit();
        gerarNomeUnicoConta(nomeBase).then((nomeConta1) => {
            gerarNomeUnicoConta(nomeBase).then((nomeConta2) => {
                ContasPage.adicionarConta(nomeConta1);
                ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
                ContasPage.adicionarConta(nomeConta2);
                ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
            });
        });

        MovimentacoesPage.visit();
        gerarNomeUnicoMovimentacao(nomeBase).then((nomeMovimentacao1) => {
            gerarNomeUnicoMovimentacao(nomeBase).then((nomeMovimentacao2) => {
                MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 701', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
                MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

                MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 701', 'Proprietário', '10/03/2025', '10/03/2025', 'Pendente');
                MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
            });
        });
    });

    it('Deve criar no mínimo 2 movimentações para cada situação', () => {
        MovimentacoesPage.visit();
        gerarNomeUnicoMovimentacao(nomeBase).then((nomeMovimentacao) => {
            MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 701', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

            MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 701', 'Proprietário', '10/03/2025', '10/03/2025', 'Pendente');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
        });
    });

    it('Deve criar no mínimo 2 movimentações para meses diferentes', () => {
        MovimentacoesPage.visit();
        gerarNomeUnicoMovimentacao(nomeBase).then((nomeMovimentacao) => {
            MovimentacoesPage.criarMovimentacao('Receita', 'Salário', '1000', 'Conta Movimentações 701', 'Empresa XYZ', '15/03/2025', '15/03/2025', 'Pago');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');

            MovimentacoesPage.criarMovimentacao('Despesa', 'Aluguel', '800', 'Conta Movimentações 701', 'Proprietário', '15/02/2025', '15/02/2025', 'Pendente');
            MovimentacoesPage.validarMensagemSucesso('Movimentação adicionada com sucesso!');
        });
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