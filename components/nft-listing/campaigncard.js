import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import * as ethers from "ethers";
import { useWeb3Contract } from "react-moralis";
const { Meta } = Card;

import useAdmin from "../../hooks/useAdmin";
import { nftContractAbi } from "../../constants/ethereum/nftContract";

export default function CampaignCard({ price, nftAddress, tokenId }) {
    const [imageUri, setImageUri] = useState("");
    const { isAdmin } = useAdmin();
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
        <Card
            cover={
                imageUri ? <img style={{ height: "250px" }} alt="example" src={imageUri} /> : null
            }
            hoverable
        >
            <Meta description={`Price: ${ethers.utils.formatEther(price)} ETH`} />
            <br />
            <div className="addButton">
                <Button danger={isAdmin} style={{ height: "40px" }} type="primary" block>
                    {isAdmin ? "Cancel" : "Purchase"}
                </Button>
            </div>
        </Card>
    );
}
