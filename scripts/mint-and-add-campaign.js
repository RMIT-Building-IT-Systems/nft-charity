const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");

const PRICE = ethers.utils.parseEther("0.1");

async function mintAndAddCampaign() {
    const campaignFactory = await ethers.getContract("CampaignFactory");

    console.log("Minting NFTs...");
    const nft = await ethers.getContract("Nft");
    const mintTx = await nft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt.events[0].args.tokenId;

    console.log("Approving NFT...");
    const approvalTx = await nft.approve(campaignFactory.address, tokenId);
    await approvalTx.wait(1);

    console.log("Adding campaign...");
    const tx = await campaignFactory.addCampaign(
        "test",
        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        "30",
        [
            {
                nftAddress: nft.address,
                tokenId: tokenId,
                price: PRICE,
            },
        ]
    );
    await tx.wait(1);
    console.log("Campaign added!");

    if (network.config.chainId == 31337) {
        await moveBlocks(1, (sleepAmount = 1000));
    }

    const campaigns = await campaignFactory.getCampaigns();
    console.log('campaigns :', campaigns);
}

mintAndAddCampaign()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
