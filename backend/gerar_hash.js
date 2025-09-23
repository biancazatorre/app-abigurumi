// gerar_hash.js
const bcrypt = require('bcrypt');

const senhaAberta = 'admin123'; 
const saltRounds = 10;

bcrypt.hash(senhaAberta, saltRounds, function(err, hash) {
    if (err) {
        console.error('Erro ao gerar o hash:', err);
        return;
    }
    console.log('Sua nova senha criptografada é:');
    console.log(hash);
});