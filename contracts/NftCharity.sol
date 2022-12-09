// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftCharity is ReentrancyGuard {
    struct Request {
        uint256 id;
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(address indexed seller, address indexed nftAddress, uint256 indexed tokenId);

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    address private i_admin;
    mapping(address => mapping(uint256 => uint256)) private s_nftListings;
    Request[] private requests;
    mapping(address => bool) private s_donators;
    uint256 private s_requestsCount;
    uint256 private s_donatorsCount;
    uint256 private s_completeRequestsCount;
    uint256 private s_moneyAvailableForRequests;

    modifier onlyAdmin() {
        require(msg.sender == i_admin, "Only admin can call this function");
        _;
    }

    modifier onlyDonator() {
        require(s_donators[msg.sender], "Only donator can call this function");
        _;
    }

    modifier notListed(address nftAddress, uint256 tokenId) {
        uint256 price = s_nftListings[nftAddress][tokenId];
        require(price <= 0, "Item is already listed");
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        uint256 price = s_nftListings[nftAddress][tokenId];
        require(price > 0, "Item is not listed");
        _;
    }

    modifier isAdminNftOwner(address nftAddress, uint256 tokenId) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        require(owner == i_admin, "The NFT must be owned by admin.");
        _;
    }

    constructor() {
        i_admin = msg.sender;
    }

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external notListed(nftAddress, tokenId) isAdminNftOwner(nftAddress, tokenId) {
        require(price > 0, "The price must be above 0.");
        IERC721 nft = IERC721(nftAddress);
        require(nft.getApproved(tokenId) == address(this), "The Nft must be approved.");
        s_nftListings[nftAddress][tokenId] = price;
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isAdminNftOwner(nftAddress, tokenId)
        isListed(nftAddress, tokenId)
    {
        delete (s_nftListings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function buyItem(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId)
        nonReentrant
    {
        uint256 price = s_nftListings[nftAddress][tokenId];
        require(msg.value >= price, "You must pay the price of the item.");
        delete (s_nftListings[nftAddress][tokenId]);
        s_donators[msg.sender] = true;
        s_donatorsCount++;
        s_moneyAvailableForRequests += price;
        IERC721(nftAddress).safeTransferFrom(i_admin, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, price);
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public onlyAdmin {
        require(value <= s_moneyAvailableForRequests, "Not enough money available for requests");
        Request storage newRequest = requests.push();

        newRequest.id = s_requestsCount;
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalsCount = 0;

        s_requestsCount++;
        s_moneyAvailableForRequests -= value;
    }

    function approveRequest(uint256 index) public onlyDonator {
        Request storage request = requests[index];

        require(!request.approvals[msg.sender], "You have already approved this request");

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint256 index) public onlyAdmin {
        Request storage request = requests[index];

        require(request.approvalsCount >= (s_donatorsCount / 2), "Not enough approvals");
        require(!request.complete, "Request already completed");

        (bool success, ) = payable(request.recipient).call{value: request.value}("");
        require(success, "Transfer failed");
        request.complete = true;
        s_moneyAvailableForRequests -= request.value;
        s_completeRequestsCount++;
    }

    // Getter functions

    function getAdmin() external view returns (address) {
        return i_admin;
    }

    function getNftListingPrice(address nftAddress, uint256 tokenId) external view returns (uint256) {
        return s_nftListings[nftAddress][tokenId];
    }

    function getRequestsCount() external view returns (uint256) {
        return s_requestsCount;
    }

    function getDonatorsCount() external view returns (uint256) {
        return s_donatorsCount;
    }

    function getCompleteRequestsCount() external view returns (uint256) {
        return s_completeRequestsCount;
    }

    function getMoneyAvailableForRequests() external view returns (uint256) {
        return s_moneyAvailableForRequests;
    }

    function getCurrentFund() external view returns (uint256) {
        return address(this).balance;
    }
}
