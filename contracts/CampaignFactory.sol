// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Campaign.sol";
import "hardhat/console.sol";

contract CampaignFactory {
    address[] private s_campaigns;
    mapping(address => bool) private s_admins;

    event CampaignStart(
        address indexed campaignAddress,
        address indexed organizer,
        address indexed receiver
    );

    modifier onlyAdmin() {
        require(s_admins[msg.sender], "Only admin can call this function");
        _;
    }

    constructor() {
        s_admins[msg.sender] = true;
    }

    function addCampaign(
        string memory campaignDescription,
        address receiver,
        uint256 timeLast,
        Campaign.NftInfo[] memory nftInfos
    ) public onlyAdmin returns (Campaign) {
        for (uint256 i = 0; i < nftInfos.length; i++) {
            Campaign.NftInfo memory nftInfo = nftInfos[i];
            IERC721 nft = IERC721(nftInfo.nftAddress);
            require(nft.getApproved(nftInfo.tokenId) == address(this), "Not approved");
            require(nftInfo.price > 0, "Price must be greater than 0");
        }

        Campaign newCampaign = new Campaign(
            msg.sender,
            campaignDescription,
            receiver,
            timeLast,
            nftInfos
        );
        s_campaigns.push(address(newCampaign));
        emit CampaignStart(address(newCampaign), msg.sender, receiver);

        return newCampaign;
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        s_admins[newAdmin] = true;
    }

    function getCampaigns() public view returns (address[] memory) {
        return s_campaigns;
    }
}
