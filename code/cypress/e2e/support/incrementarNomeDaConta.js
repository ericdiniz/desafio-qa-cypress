function gerarNomeUnico(nomeBase) {
    let contador = localStorage.getItem('contadorContas');

    if (!contador) {
        contador = 10;
    } else {
        contador = parseInt(contador, 10) + 1;
    }

    localStorage.setItem('contadorContas', contador);

    return `${nomeBase} ${contador}`;
}

module.exports = gerarNomeUnico;