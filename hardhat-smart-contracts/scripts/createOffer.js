const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xb6e40e89a0904f567EB2225330F90C836E9d67bD";
    const MyContract = await ethers.getContractFactory("EnergyMarketplace");
    const myContract = await MyContract.attach(contractAddress);

    // Obtén el primer signer (cuenta que pagará el gas)
    const [signer] = await ethers.getSigners();
    const userAddress = "0x43Cb809d81C3302adF2214230d56d5C5D78e6079";
    const energyAmount = 70; // Ejemplo: 70 kWh
    const price = 20;         // Ejemplo: 20 (precio por kWh)

    // Crea una oferta usando la cuenta del `signer`
    const tx = await myContract.createOffer(energyAmount, price, userAddress);
    await tx.wait();

    console.log(`Oferta creada con ${energyAmount} kWh y precio de ${price} por kWh`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
