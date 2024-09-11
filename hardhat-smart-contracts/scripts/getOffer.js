const { ethers } = require("hardhat");

async function main() {
    // Dirección del contrato
    const contractAddress = "0xb6e40e89a0904f567EB2225330F90C836E9d67bD";

    // Carga el contrato
    const MyContract = await ethers.getContractFactory("EnergyMarketplace");
    const myContract = await MyContract.attach(contractAddress);

    // ID de la oferta que quieres consultar
    const offerId = 0; // Cambia esto al ID de la oferta que quieres verificar

    // Llama a la función getOffer del contrato para obtener la oferta
    const offer = await myContract.getOffer(offerId);

    // Muestra los detalles de la oferta
    console.log(`Detalles de la oferta ID ${offerId}:`);
    console.log(`- Seller: ${offer.seller}`);
    console.log(`- Gas Payer: ${offer.gasPayer}`);
    console.log(`- Energy Amount: ${offer.energyAmount} kWh`);
    console.log(`- Price: ${offer.price}`);
    console.log(`- Status: ${offer.status}`);
    console.log(`- Timestamp: ${new Date(offer.timestamp.toNumber() * 1000).toLocaleString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
