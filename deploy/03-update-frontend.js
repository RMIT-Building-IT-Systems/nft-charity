require("dotenv").config();
const fs = require("fs");
const { network } = require("hardhat");

const frontEndContractsFile = "./constants/networkMapping.json"
const frontEndAbiLocation = "./constants/"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...");
        await updateContractAddresses();
        await updateAbi();
        console.log("Front end written!");
    }
};

async function updateAbi() {
    const campaignFactory = await ethers.getContract("CampaignFactory");

    fs.writeFileSync(
        `${frontEndAbiLocation}CampaignFactory.json`,
        campaignFactory.interface.format(ethers.utils.FormatTypes.json)
    );

    const nft = await ethers.getContract("Nft");
    fs.writeFileSync(
        `${frontEndAbiLocation}BasicNft.json`,
        nft.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const campaignFactory = await ethers.getContract("CampaignFactory");
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["CampaignFactory"].includes(campaignFactory.address)) {
            contractAddresses[chainId]["CampaignFactory"].push(campaignFactory.address)
        }
    } else {
        contractAddresses[chainId] = { CampaignFactory: [campaignFactory.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"];
