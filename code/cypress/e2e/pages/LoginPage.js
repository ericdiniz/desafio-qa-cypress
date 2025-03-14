// cypress/e2e/pages/LoginPage.js
class LoginPage {
    visit() {
        cy.visit('https://seubarriga.wcaquino.me/login');
    }

    criarNovoUsuario(nome, email, senha) {
        cy.contains('Novo usuário?').click();
        cy.get('input[placeholder="Nome"]').type(nome);
        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(senha);
        cy.contains('Cadastrar').click();
    }

    fazerLogin(email, senha) {
        cy.get('input[placeholder="Email"]').type(email);
        cy.get('input[placeholder="Password"]').type(senha);
        cy.contains('Entrar').click();
    }

    validarMensagemSucesso(mensagem) {
        cy.contains(mensagem).should('be.visible');
    }

    validarMensagemErro(mensagem) {
        cy.contains(mensagem).should('be.visible');
    }
}

export default new LoginPage();