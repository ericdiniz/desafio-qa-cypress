// cypress/e2e/specs/contas.cy.js
import ContasPage from '../pages/ContasPage';
import LoginPage from '../pages/LoginPage';
import gerarNomeUnico from '../support/incrementarNomeDaConta';

describe('Fluxo de Gestão de Contas', () => {
    const nomeBase = 'Conta Teste';

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fazerLogin('usuario_teste6@exemplo.com', 'senha123');
    });

    it('Deve adicionar no mínimo 2 contas', () => {
        ContasPage.visit();

        const nomeConta1 = gerarNomeUnico(nomeBase);
        const nomeConta2 = gerarNomeUnico(nomeBase);

        ContasPage.adicionarConta(nomeConta1);
        ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
        ContasPage.adicionarConta(nomeConta2);
        ContasPage.validarMensagemSucesso('Conta adicionada com sucesso!');
    });

    it('Deve listar todas as contas', () => {
        ContasPage.visit();
        ContasPage.listarContas().should('have.length.at.least', 2);
    });

    it('Deve alterar o nome de uma conta', () => {
        ContasPage.visit();
        const nomeConta = gerarNomeUnico(nomeBase);
        const nomeEditado = ContasPage.alterarNomeConta(nomeConta);
        cy.contains('table tbody tr', nomeEditado).should('be.visible');
    });

    it('Deve tentar adicionar uma conta com o nome já existente', () => {
        ContasPage.visit();
        const nomeConta = gerarNomeUnico(nomeBase);
        ContasPage.adicionarConta(nomeConta);
        ContasPage.adicionarConta(nomeConta);
        ContasPage.validarMensagemErro('Já existe uma conta com esse nome!');
    });

    it('Deve tentar excluir uma conta vinculada a uma movimentação', () => {
        ContasPage.visit();
        cy.pause();
        const nomeConta = gerarNomeUnico(nomeBase);
        ContasPage.excluirConta(nomeConta);
        ContasPage.validarMensagemErro('Conta em uso na movimentações');
    });


});