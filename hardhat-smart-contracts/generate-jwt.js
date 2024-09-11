const jwt = require('jsonwebtoken');

const secret = Buffer.from('0x6ecf12e28caa49729e27b4e550ac924817c7940e08c9b01d9fd9a7ccf6c161a7', 'hex');
const token = jwt.sign({}, secret, { algorithm: 'HS256' });

console.log(token);
