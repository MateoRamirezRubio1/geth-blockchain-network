async function main() {
  const contractAddress = "0x88305774757826b6E40485b57FDe40BAcf1E1676";
  const MyContract = await ethers.getContractFactory("EnergyMarketplace");

  const myContract = await MyContract.attach(contractAddress);

  // Crear una oferta de energía
  const energyAmount = 100;  // Ejemplo: 100 kWh
  const price = 50;          // Ejemplo: 50 (precio por kWh)
  const txCreate = await myContract.createOffer(energyAmount, price);
  await txCreate.wait();
  console.log(`Oferta creada con ${energyAmount} kWh y precio de ${price} por kWh`);

  // Obtener los detalles de la oferta creada (ID 0 ya que es la primera oferta)
  const offerId = 2;
  const offer = await myContract.getOffer(offerId);
  console.log(`Detalles de la oferta: ID: ${offer.id}, Vendedor: ${offer.seller}, Energía: ${offer.energyAmount} kWh, Precio: ${offer.price}`);

  // Actualizar la oferta
  const newEnergyAmount = 150; // Nueva cantidad de energía
  const newPrice = 45;         // Nuevo precio por kWh
  const txUpdate = await myContract.editOffer(offerId, newEnergyAmount, newPrice);
  await txUpdate.wait();
  console.log(`Oferta actualizada: Nueva energía: ${newEnergyAmount} kWh, Nuevo precio: ${newPrice} por kWh`);

  // Cambiar el estado de la oferta a 'Sold'
  const txStatusChange = await myContract.changeOfferStatus(offerId, 1); // 1 corresponde a 'Sold'
  await txStatusChange.wait();
  console.log("El estado de la oferta ha cambiado a 'Sold'");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

