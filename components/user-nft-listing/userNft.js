import { useState, useEffect } from "react";
import { Card, Image } from "antd";

import { useWeb3Contract } from "react-moralis";
import { nftContractAbi } from "../../constants/ethereum/nftContract";

export default function CampaignCard({ nftAddress, tokenId }) {
    const [imageUri, setImageUri] = useState("");

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftContractAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: parseInt(tokenId),
        },
    });

    const updateUI = async () => {
        const tokenURI = await getTokenURI();
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const tokenURIResponse = await (await fetch(requestURL)).json();
            const imageURI = tokenURIResponse.image;
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            setImageUri(imageURIURL);
        }
    };

    useEffect(() => {
        updateUI();
    }, [updateUI]);

    return (
        <img
            src={imageUri}
            preview={false}
            height={250}
            style={{ border: "1px solid #f3f4f6", borderRadius: "15px" }}
        />
    );
}
