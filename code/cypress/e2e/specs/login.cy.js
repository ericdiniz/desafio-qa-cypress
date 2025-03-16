import LoginPage from '../pages/LoginPage';

describe('Fluxo de Login', () => {
    let usuarios;
    let novoEmail;

    before(() => {
        cy.task('readUsuariosJson').then((data) => {
            usuarios = data;

            const emailAtual = usuarios.email;
            const numeroAtual = parseInt(emailAtual.match(/\d+/)[0], 20);
            const novoNumero = numeroAtual + 1;
            novoEmail = emailAtual.replace(/\d+/, novoNumero);

            cy.task('writeUsuariosJson', { email: novoEmail });
        });
    });

    it('Deve criar um novo usuário com sucesso', () => {
        LoginPage.visit();
        LoginPage.criarNovoUsuario(usuarios.nome, novoEmail, usuarios.senha);
        LoginPage.validarMensagemSucesso('Usuário inserido com sucesso');
    });

    it('Deve validar que o sistema só permite login com usuário cadastrado', () => {
        LoginPage.visit();
        LoginPage.fazerLogin('nao_cadastrado@exemplo.com', usuarios.senha);
        LoginPage.validarMensagemErro('Problemas com o login do usuário');
    });

    it('Deve realizar login com sucesso', () => {
        LoginPage.visit();
        LoginPage.fazerLogin(novoEmail, usuarios.senha);
        cy.url().should('eq', 'https://seubarriga.wcaquino.me/logar');
        cy.contains(`Bem vindo, ${usuarios.nome}!`).should('be.visible');
    });

    it('Deve deslogar do sistema com sucesso', () => {
        LoginPage.visit();
        LoginPage.fazerLogin(novoEmail, usuarios.senha);
        LoginPage.deslogar();
        LoginPage.validarDeslogado();
    });
});
