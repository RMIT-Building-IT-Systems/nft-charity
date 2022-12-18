const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/hardhat/move-blocks");

const PRICE = ethers.utils.parseEther("0.1");

async function mintAndList() {

    const nftCharity = await ethers.getContract("NftCharity");
    const nft = await ethers.getContract("Nft");

    console.log("Minting NFT...");
    const mintTx = await nft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);

    const tokenId = mintTxReceipt.events[0].args.tokenId;
    console.log("Approving NFT...");
    const approvalTx = await nft.approve(nftCharity.address, tokenId);
    await approvalTx.wait(1);

    console.log("Listing NFT...");
    const tx = await nftCharity.listItem(nft.address, tokenId, PRICE);
    await tx.wait(1);
    console.log("NFT Listed!");

    if (network.config.chainId == 31337) {
        // Moralis has a hard time if you move more than 1 at once!
        await moveBlocks(1, (sleepAmount = 1000));
    }
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
