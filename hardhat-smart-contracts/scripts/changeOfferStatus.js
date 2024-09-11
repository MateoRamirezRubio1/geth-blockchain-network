async function main() {
    const contractAddress = "0xb6e40e89a0904f567EB2225330F90C836E9d67bD";
    const MyContract = await ethers.getContractFactory("EnergyMarketplace");
    const myContract = await MyContract.attach(contractAddress);

    const offerId = 0; // ID de la oferta cuya status deseas cambiar
    const newStatus = 1; // 1 para 'Sold', 2 para 'Cancelled', etc.
    const userAddress = "0x43Cb809d81C3302adF2214230d56d5C5D78e6079";

    const tx = await myContract.changeOfferStatus(offerId, newStatus, userAddress);
    await tx.wait();
    console.log(`El estado de la oferta ha cambiado a '${newStatus === 1 ? 'Sold' : 'Cancelled'}'`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
