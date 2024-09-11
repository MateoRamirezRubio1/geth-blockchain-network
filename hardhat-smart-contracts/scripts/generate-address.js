const Web3 = require('web3');

// Generar una nueva cuenta
const account = Web3.eth.accounts.create();

// Obtener la clave privada y la dirección pública
const privateKey = account.privateKey;
const publicAddress = account.address;

// Mostrar la clave privada y la dirección pública
console.log('Clave Privada:', privateKey);
console.log('Dirección Pública:', publicAddress);
