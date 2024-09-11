pragma solidity ^0.8.24;

contract EnergyMarketplace {
    enum OfferStatus { Active, Sold, Cancelled }

    struct Offer {
        uint256 id;
        address seller;        // Dirección del usuario
        address gasPayer;      // Dirección del nodo que paga el gas
        uint256 energyAmount; // in kWh
        uint256 price;        // price per kWh
        OfferStatus status;
        uint256 timestamp;
    }

    uint256 private nextOfferId;
    mapping(uint256 => Offer) public offers;

    event OfferCreated(uint256 offerId, address indexed seller, uint256 energyAmount, uint256 price);
    event OfferUpdated(uint256 offerId, uint256 energyAmount, uint256 price);
    event OfferStatusChanged(uint256 offerId, OfferStatus status);

    modifier onlySeller(uint256 _offerId, address _userAddress) {
        require(offers[_offerId].seller == _userAddress, "Only seller can modify the offer");
        _;
    }

    modifier onlyActiveOffer(uint256 _offerId) {
        require(offers[_offerId].status == OfferStatus.Active, "Offer is not active");
        _;
    }

    function createOffer(uint256 _energyAmount, uint256 _price, address _seller) external {
        require(_energyAmount > 0, "Energy amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        Offer memory newOffer = Offer({
            id: nextOfferId,
            seller: _seller,         // Dirección del usuario
            gasPayer: msg.sender,    // Dirección del nodo que paga el gas
            energyAmount: _energyAmount,
            price: _price,
            status: OfferStatus.Active,
            timestamp: block.timestamp
        });

        offers[nextOfferId] = newOffer;

        emit OfferCreated(nextOfferId, _seller, _energyAmount, _price);
        incrementNextOfferId();
    }

    function editOffer(uint256 _offerId, uint256 _newEnergyAmount, uint256 _newPrice, address _userAddress) 
        external 
        onlySeller(_offerId, _userAddress) 
        onlyActiveOffer(_offerId) 
    {
        require(_newEnergyAmount > 0, "Energy amount must be greater than 0");
        require(_newPrice > 0, "Price must be greater than 0");

        Offer storage offer = offers[_offerId];
        offer.energyAmount = _newEnergyAmount;
        offer.price = _newPrice;

        emit OfferUpdated(_offerId, _newEnergyAmount, _newPrice);
    }

    function changeOfferStatus(uint256 _offerId, OfferStatus _newStatus, address _userAddress) 
        external 
        onlySeller(_offerId, _userAddress) 
        onlyActiveOffer(_offerId) 
    {
        require(_newStatus == OfferStatus.Sold || _newStatus == OfferStatus.Cancelled, "Invalid status change");

        Offer storage offer = offers[_offerId];
        offer.status = _newStatus;

        emit OfferStatusChanged(_offerId, _newStatus);
    }

    function getOffer(uint256 _offerId) external view returns (Offer memory) {
        require(_offerId < nextOfferId, "Offer does not exist");
        return offers[_offerId];
    }

    function incrementNextOfferId() internal {
        unchecked {
            nextOfferId++;
        }
    }
}
