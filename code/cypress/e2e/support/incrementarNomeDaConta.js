export function gerarNomeUnicoConta(base) {
    return cy.task('lerContador').then((contadores) => {
        const nomeUnico = `${base} ${contadores.contadorContas}`;
        contadores.contadorContas += 1;
        return cy.task('atualizarContador', { contadorContas: contadores.contadorContas }).then(() => {
            return nomeUnico;
        });
    });
}

export function gerarNomeUnicoMovimentacao(base) {
    return cy.task('lerContador').then((contadores) => {
        const nomeUnico = `${base} ${contadores.contadorMovimentacoes}`;
        contadores.contadorMovimentacoes += 1;
        return cy.task('atualizarContador', { contadorMovimentacoes: contadores.contadorMovimentacoes }).then(() => {
            return nomeUnico;
        });
    });
}