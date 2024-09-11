const fs = require('fs');

const net = require('net');

console.log('Verifying IPC file existence...');
if (fs.existsSync('/root/geth.ipc')) {
  console.log('IPC file exists!');
  // Conectarse al socket de dominio Unix
  const socket = net.connect('/root/geth.ipc');
  socket.on('connect', () => {
    console.log('Connected to IPC socket!');
    // Enviar un mensaje para verificar la conexión
    // socket.write('ping');
    socket.write('{"jsonrpc":"2.0","method":"web3_clientVersion","id":1}');
  });
  socket.on('data', (data) => {
    console.log('Received data from IPC socket:', data.toString());
  });
  socket.on('error', (error) => {
    console.log('Error connecting to IPC socket:', error);
  });
} else {
  console.log('IPC file does not exist!');
}
