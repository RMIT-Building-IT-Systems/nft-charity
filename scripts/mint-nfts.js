const { ethers } = require("hardhat");
const nftCharityContractAddr = "0x94d2Bd74B4081c734D19351380d87f25993330e4";
const nftContractAbi = [
    {
        inputs: [{ internalType: "string", name: "uri", type: "string" }],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "approved", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "operator", type: "address" },
            { indexed: false, internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "NftMinted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTokenCounter",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    { inputs: [], name: "mintNft", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "tokenUri",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const nftAddresses = [
    "0x100E2693386A83d6FbBeE8a2bCC0C8D0A4512182",
    "0x31C9FDB47e778BF8DDC18E5Cf9Bb52f49BBB6d73",
    "0x8AeC68f6d2dEc684d9692317d89CB402D218d123",
    "0x59C749257A11D128b4c4CaC4186D61DcDb5CFA4c",
    "0x3FF658105ba1225aaE1aae6f7Be08c9B81188B2F",
    "0x641c0EA5231aE3E49a8E6B073F54901584E6175f",
    "0xD9AA698E8C3a76e7882Fd44CDC191a4A929a21F6",
    "0x98f8A02e64498658e091d19c1Cdc7c57e28292c7",
    "0x20F29d043DE01FA1472DeA3AFA63F0E8d9e80E92",
    "0x61438C0CFAF4CF8E96c6FfA1C5389f5695ebe8F5",
    "0x043002feb112C6135D350c54B7Fcaec4C655F0Ea",
    "0x01FC362cfa2d915D4D01Cd16C78e045A8E307a28",
    "0xE1FBd7eADC856ab54a5F07fb0bd7D8c4d4be841C",
    "0x9006716880d6a059030537A16C70954F48E02DD6",
];

const mintNfts = async () => {
    for (let i = 0; i < nftAddresses.length; i++) {
        const nftAddr = nftAddresses[i];
        const nftContract = new ethers.Contract(
            nftAddr,
            nftContractAbi,
            await ethers.getSigner("0x5FcF81463a2A63c10F51c4F9D55Fb7403759C8B9")
        );
        console.log("Minting NFT ", nftAddr);
        const mintTx = await nftContract.mintNft();
        const mintTxReceipt = await mintTx.wait(1);
        console.log("Finish minting");

        const tokenId = mintTxReceipt.events[0].args.tokenId;
        console.log("tokenId :", ethers.utils.formatEther(tokenId) * 10 ** 18);
        console.log(
            "Approving NFT",
            nftAddr,
            "with tokenId",
            ethers.utils.formatEther(tokenId) * 10 ** 18,
            "to charity contract"
        );
        const approvalTx = await nftContract.approve(nftCharityContractAddr, tokenId);
        await approvalTx.wait(1);
        console.log("Finish approving NFT");
    }
};

mintNfts().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
