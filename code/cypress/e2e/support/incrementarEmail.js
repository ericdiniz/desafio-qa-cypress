const fs = require('fs');
const path = require('path');

function incrementarEmail() {
    const filePath = path.join(__dirname, '../fixtures/usuarios.json');
    const usuarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const emailAtual = usuarios.email;
    const numeroAtual = parseInt(emailAtual.match(/\d+/)[0], 10);
    const novoNumero = numeroAtual + 1;

    const novoEmail = emailAtual.replace(/\d+/, novoNumero);
    usuarios.email = novoEmail;

    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

    return novoEmail;
}

module.exports = incrementarEmail;