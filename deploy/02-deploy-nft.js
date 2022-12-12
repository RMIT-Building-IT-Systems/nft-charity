const { network } = require("hardhat");
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
const { verify } = require("../utils/hardhat/verify");
const { storeImages, storeTokenUriMetadata } = require("../utils/hardhat/uploadToPinata");

const imagesLocation = "./images";
const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            rareness: "Common",
            value: 100,
        },
    ],
};

let tokenUris = [
    "ipfs://QmUR2j3zgC7roEY2EEcBArX6wrswVxsSMJPPnbssn9dk4d",
    "ipfs://QmWZc7ND8SaA7w9wS8dXdrTo8SZAKoCbDoupHbxXRQjXjR",
    "ipfs://Qme4u5wXzJcbUsyfiFae5LPuXWub5YccSPirJsQ8f232fw",
    "ipfs://QmQd1g5foDwv2VJkoZLeonLJ8cjd81gD6H5j1mtjmTPTch",
    "ipfs://QmYNa3TkNn48Zn7RbpNxw7o65kc7uupnYKdya5BZFKgcQm",
    "ipfs://QmZwq3bxYpcMGeu7gn3gdqJXWRYX2326DrUkwjNn7N1srm",
    "ipfs://QmcYYUdSUyE1Rt5BBCbjTBtj7d5tKW673q7tsNug6BbojZ",
    "ipfs://QmZH4KUcbApaqaXQwFYycAuuh5RRYgVfeqD5JQcGzFqZ5M",
    "ipfs://QmNShfSMDvwGv1ko7QT7x9NSgkA3hXaGesHnRw8VBQTyYS",
    "ipfs://QmT2AQsCgDMJaUthfa8Y8uhyih5gN6h3K5KKwDL49MKY9h",
    "ipfs://QmZvq1C4Ajnaqp6Q4oa12cPoFXkhWWXhgiaWEkGJUQgLPm",
    "ipfs://QmSmenNR3DHq8nm7B9h1uRQHyR7ZzohTHqxts6FAnrqBiE",
    "ipfs://QmYQbDcCFDScGGUGCz3KGYmrtm4UHAJi5qH16Uykhr1rw8",
    "ipfs://QmXScsn2GbgH8Hm8ZkZhaCPRaZC6EAfcSps9gcAUNo1jHp",
    "ipfs://QmRtWJ1iQat8GJBYhnkEBAbyttzYxfVKuXnQR8ABViS6F2",
    "ipfs://QmYV9uratRuifQNeefNewmjCW5LBCSvJDs9oWLzpAoo3WN",
    "ipfs://QmYDfxfxJo2nALssYEBMn6D3m69wCXCSeSXXdHoYuc4j1F",
    "ipfs://Qmd6q6TX4P5PwHKdUudGJ9r7Bhxkw8j7mDu7w6DsJkJf3G",
    "ipfs://Qmcd7ZGErgiFJFbjkWgiL81tkEH5bqhA6tRredSwzE21yV",
    "ipfs://Qmab5bRkyQsNkk9N9ZxqYRWJRQNXRNNvp1e9ZdeDm1JvDd",
    "ipfs://QmcACL6h3emdotvG3T3pHqxm4ctesuLSPR5kyQGJEhF5qP",
    "ipfs://QmSmN2cphQrokFFz76dNGqVWJftCCmQtNVeWCHrtmrUshB",
    "ipfs://QmTPDTW8UwxhUPLmUXi7WaRbbb6yotJHAdFDn22SqD6x7n",
    "ipfs://QmaEEeveiNbSv7MRMfJ54CqzcEP6Fg8fbvfwzsUvkBoyiV",
    "ipfs://QmYd9D7XfHJEER4E696Sxj9HwDB6TMSr5FC64xqy4UNBFW",
    "ipfs://QmQ4AeWM1svzfbsD5SX66LfEt7dQa9XwYtdT8JvsapjDMy",
];

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log("deployer :", deployer);
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    if (process.env.UPLOAD_TO_PINATA) {
        tokenUris = await handleTokenUris();
    }

    log("---------------------------------------");

    const args = [tokenUris[0]];
    const nft = await deploy("Nft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(nft.address, args);
    }
    log("----------------------------------------------------");

};

async function handleTokenUris() {
    tokenUris = [];

    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation);

    for (imageUploadResponseIndex in imageUploadResponses) {
        let tokenUriMetadata = { ...metadataTemplate };
        tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "");
        tokenUriMetadata.description = `This is an NFT called ${tokenUriMetadata.name}.`;
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`;
        console.log(`Uploading metadata for ${tokenUriMetadata.name}...`);

        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata);
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
    }
    console.log("tokenUris", tokenUris);
    return tokenUris;
}

module.exports.tags = ["all", "nft"];
