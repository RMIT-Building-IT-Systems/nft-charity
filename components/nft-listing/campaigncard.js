import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import * as ethers from "ethers";
const { Meta } = Card;

import useAdmin from "../../hooks/useAdmin";
import { nftContractAbi } from "../../constants/ethereum/nftContract";

import { useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../../constants/ethereum/nftCharityContract";
import useNotification from "../../hooks/useNotification";

export default function CampaignCard({ price, nftAddress, tokenId }) {
    const [imageUri, setImageUri] = useState("");
    const [isCancelling, setIsCancelling] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    const { isAdmin } = useAdmin();
    const { raiseSuccess, raiseFailure, notificationContextHolder } = useNotification();

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

    const { runContractFunction } = useWeb3Contract();

    const cancelListing = async () => {
        setIsCancelling(true);
        const cancelOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "cancelListing",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
            },
        };

        await runContractFunction({
            params: cancelOptions,
            onSuccess: (tx) => {
                tx.wait();
                raiseSuccess("Successfully removed NFT!");
            },
            onError: (error) => {
                console.log(error);
                raiseFailure("Error removing NFTs!");
            },
        });
        setIsCancelling(false);
    };

    const purchaseItem = async () => {
        setIsPurchasing(true);
        const purchaseOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "buyItem",
            msgValue: price,
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
            },
        };

        await runContractFunction({
            params: purchaseOptions,
            onSuccess: (tx) => {
                tx.wait();
                raiseSuccess("Successfully purchased NFT!");
            },
            onError: (error) => {
                console.log(error);
                raiseFailure("Error purchasing NFTs!");
            },
        });
        setIsPurchasing(false);
    };

    useEffect(() => {
        updateUI();
    }, [updateUI]);

    return (
        <>
            {notificationContextHolder}
            <Card
                cover={
                    imageUri ? (
                        <img style={{ height: "250px" }} alt="example" src={imageUri} />
                    ) : null
                }
                hoverable
            >
                <Meta description={`Price: ${ethers.utils.formatEther(price)} ETH`} />
                <br />
                <div className="addButton">
                    <Button
                        loading={isCancelling || isPurchasing}
                        danger={isAdmin}
                        style={{ height: "40px" }}
                        onClick={isAdmin ? cancelListing : purchaseItem}
                        type="primary"
                        block
                    >
                        {isAdmin ? "Cancel" : "Purchase"}
                    </Button>
                </div>
            </Card>
        </>
    );
}
