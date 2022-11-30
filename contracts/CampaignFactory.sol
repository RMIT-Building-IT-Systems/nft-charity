// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Campaign.sol";

contract CampaignFactory {
    address[] private s_campaigns;
    mapping(address => bool) private s_admins;

    event CampaignStart(
        address indexed campaignAddress,
        address indexed organizer
    );

    modifier onlyAdmin() {
        require(s_admins[msg.sender], "Only admin can call this function");
        _;
    }

    function addCampaign(
        string memory campaignDescription,
        address receiver,
        uint256 timeLast
    ) public onlyAdmin {
        Campaign newCampaign = new Campaign(msg.sender, campaignDescription, receiver, timeLast);
        s_campaigns.push(address(newCampaign));
        emit CampaignStart(address(newCampaign), msg.sender);
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        s_admins[newAdmin] = true;
    }

    function getCampaigns() public view returns (address[] memory) {
        return s_campaigns;
    }
}
