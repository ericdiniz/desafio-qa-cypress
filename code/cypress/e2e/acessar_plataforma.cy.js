describe('Acessar a plataforma', () => {
  it('Deve acessar a plataforma com sucesso', () => {
    cy.visit('https://seubarriga.wcaquino.me/login');

    cy.url().should('include', '/login');

    cy.get('body').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="Password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});