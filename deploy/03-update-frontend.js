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
    const nftCharity = await ethers.getContract("NftCharity");

    fs.writeFileSync(
        `${frontEndAbiLocation}NftCharity.json`,
        nftCharity.interface.format(ethers.utils.FormatTypes.json)
    );

    const nft = await ethers.getContract("Nft");
    fs.writeFileSync(
        `${frontEndAbiLocation}Nft.json`,
        nft.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const nftCharity = await ethers.getContract("NftCharity");
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["NftCharity"].includes(nftCharity.address)) {
            contractAddresses[chainId]["NftCharity"].push(nftCharity.address)
        }
    } else {
        contractAddresses[chainId] = { NftCharity: [nftCharity.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

// module.exports.tags = ["all", "frontend"];
