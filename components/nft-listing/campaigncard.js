import { useState, useEffect, useCallback } from "react";
import { Card, Button, Spin } from "antd";
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
    const [isLoadingImg, setIsLoadingImg] = useState(true);
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

    const updateUI = useCallback(async () => {
        const tokenURI = await getTokenURI();
        if (tokenURI) {
            // setIsLoadingImg(true);
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const tokenURIResponse = await (await fetch(requestURL)).json();
            const imageURI = tokenURIResponse.image;
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            setImageUri(imageURIURL);
        }
        // setIsLoadingImg(false);
    }, [getTokenURI, setIsLoadingImg, setImageUri]);

    const { runContractFunction } = useWeb3Contract();

    const cancelListing = useCallback(async () => {
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
    }, [runContractFunction, setIsCancelling, raiseSuccess, raiseFailure]);

    const purchaseItem = useCallback(async () => {
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
    }, [runContractFunction, setIsPurchasing, raiseSuccess, raiseFailure]);

    useEffect(() => {
        updateUI();
    }, [updateUI]);

    return (
        <>
            {notificationContextHolder}
            <Card
                cover={
                    imageUri ? (
                        isLoadingImg ? (
                            <img style={{ height: "250px" }} alt="example" src={imageUri} />
                        ) : (
                            <Spin />
                        )
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
