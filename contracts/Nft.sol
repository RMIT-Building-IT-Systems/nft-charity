/*******
********************************************************
*Title: OpenZepplin | Contracts
*Author: OpenZepplin
*Date: April 28th, 2022
*Code version: N/A
*Availability: https://www.openzeppelin.com/contracts (Accessed 18th December 2022)
****************************************************************/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nft is ERC721 {
    string public tokenUri;
    uint256 private s_tokenCounter;

    event NftMinted(uint256 indexed tokenId);

    constructor(string memory uri) ERC721("Nft", "NFT") {
        tokenUri = uri;
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        emit NftMinted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenUri;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}