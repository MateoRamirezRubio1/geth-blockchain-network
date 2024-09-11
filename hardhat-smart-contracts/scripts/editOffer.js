async function main() {
    const contractAddress = "0xb6e40e89a0904f567EB2225330F90C836E9d67bD";
    const MyContract = await ethers.getContractFactory("EnergyMarketplace");
    const myContract = await MyContract.attach(contractAddress);

    const offerId = 0; // ID de la oferta que deseas actualizar
    const newEnergyAmount = 150; // Nueva cantidad de energía
    const newPrice = 45;         // Nuevo precio por kWh
    const userAddress = "0x43Cb809d81C3302adF2214230d56d5C5D78e6079";

    const tx = await myContract.editOffer(offerId, newEnergyAmount, newPrice, userAddress);
    await tx.wait();
    console.log(`Oferta actualizada: Nueva energía: ${newEnergyAmount} kWh, Nuevo precio: ${newPrice} por kWh`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
