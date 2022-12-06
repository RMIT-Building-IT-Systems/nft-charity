// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotOwner();

contract Campaign is KeeperCompatibleInterface {
    enum CampaignState {
        ACTIVE,
        PASSED
    }

    struct NftInfo {
        address nftAddress;
        uint256 tokenId;
        uint256 price;
    }

    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(
        address indexed campaignAddress,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event CampaignEnd(
        address indexed campaignAddress,
        address indexed organizer,
        address indexed receiver
    );

    address private immutable i_organizer;
    address private immutable i_receiver;
    uint256 private immutable i_hourLast;
    uint256 private immutable i_startingTime;
    string private s_campaignDescription;
    CampaignState private s_campaignState;
    mapping(address => mapping(uint256 => Listing)) private s_listings;

    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    constructor(
        address organizer,
        string memory campaignDescription,
        address receiver,
        uint256 hourLast,
        NftInfo[] memory nftInfos
    ) {
        i_organizer = organizer;
        i_receiver = receiver;
        i_hourLast = hourLast;
        s_campaignDescription = campaignDescription;
        i_startingTime = block.timestamp;
        s_campaignState = CampaignState.ACTIVE;

        for (uint256 i = 0; i < nftInfos.length; i++) {
            NftInfo memory nftInfo = nftInfos[i];
            addItem(nftInfo.nftAddress, nftInfo.tokenId, nftInfo.price);
        }
    }

    function addItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) internal notListed(nftAddress, tokenId) {
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(address(this), nftAddress, tokenId, price);
    }

    function buyItem(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId)
    {
        Listing memory listedItem = s_listings[nftAddress][tokenId];
        require(msg.value >= listedItem.price, "Not enough funds sent");
        delete (s_listings[nftAddress][tokenId]);
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
    }

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        bool isActive = s_campaignState == CampaignState.ACTIVE;
        bool timePassed = block.timestamp - i_startingTime > i_hourLast * 1 hours;
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = isActive && timePassed && hasBalance;
        return (upkeepNeeded, "0x0");
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");

        require(upkeepNeeded, "No upkeep needed");

        s_campaignState = CampaignState.PASSED;
        (bool success, ) = payable(i_receiver).call{value: address(this).balance}("");
        require(success, "Transfer failed");
        emit CampaignEnd(address(this), i_organizer, i_receiver);
    }

    function getOrganizer() external view returns (address) {
        return i_organizer;
    }

    function getReceiver() external view returns (address) {
        return i_receiver;
    }

    function getHourLast() external view returns (uint256) {
        return i_hourLast;
    }

    function getStartingTime() external view returns (uint256) {
        return i_startingTime;
    }

    function getCampaignState() external view returns (CampaignState) {
        return s_campaignState;
    }

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return s_listings[nftAddress][tokenId];
    }
}
