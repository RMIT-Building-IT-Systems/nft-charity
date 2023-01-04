import React, { useState, useMemo } from "react";
import styles from "../../styles/Campaigns.module.css";
import * as ethers from "ethers";
import { Button, Modal, Input } from "antd";
import { useQuery } from "@apollo/client";

import CampaignCard from "./campaigncard";
import GET_LISTED_NFTS from "../../constants/subgraph/getListedNft";
import useAdmin from "../../hooks/useAdmin";
import useNotification from "../../hooks/useNotification";

import { useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../../constants/ethereum/nftCharityContract";
import { nftContractAbi } from "../../constants/ethereum/nftContract";

export default function NftListing() {
    const [isAddingNft, setIsAddingNft] = useState(false);
    const [openNFT, setOpenNFT] = useState(false);

    const [nftAddrInput, setNftAddrInput] = useState("");
    const [tokenIdInput, setTokenIdInput] = useState("");
    const [nftPriceInput, setNftPriceInput] = useState("");

    const { isAdmin } = useAdmin();
    const { loading: _, error: __, data: listedNfts } = useQuery(GET_LISTED_NFTS);

    const { raiseSuccess, raiseFailure, notificationContextHolder } = useNotification();

    const { runContractFunction } = useWeb3Contract();

    const activeItems = useMemo(() => listedNfts?.activeItems, [listedNfts]);

    const approveAndList = async () => {
        setIsAddingNft(true);
        const approveOptions = {
            abi: nftContractAbi,
            contractAddress: nftAddrInput,
            functionName: "approve",
            params: {
                to: nftCharityContractAddr,
                tokenId: tokenIdInput,
            },
        };

        await runContractFunction({
            params: approveOptions,
            onSuccess: (tx) => handleApproveSuccess(tx),
            onError: (error) => {
                console.log(error);
                setIsAddingNft(false);
                raiseFailure("Error approving NFT!");
            },
        });
    };

    const handleApproveSuccess = async (tx) => {
        await tx.wait();
        const listOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "listItem",
            params: {
                nftAddress: nftAddrInput,
                tokenId: tokenIdInput,
                price: ethers.utils.parseUnits(nftPriceInput, "ether").toString(),
            },
        };

        await runContractFunction({
            params: listOptions,
            onSuccess: (tx) => {
                const handleSuccess = async () => {
                    await tx.wait(1);
                    setIsAddingNft(false);
                    setOpenNFT(false);
                    raiseSuccess("NFT added successfully!");
                    setNftAddrInput("");
                    setTokenIdInput("");
                    setNftPriceInput("");
                };
                handleSuccess();
            },
            onError: (error) => {
                console.log(error);
                setIsAddingNft(false);
                raiseFailure("Error listing NFT!");
            },
        });
    };

    const showModalNFT = () => {
        setOpenNFT(true);
    };

    const handleCancelNFT = () => {
        setOpenNFT(false);
    };

    return (
        <>
            {notificationContextHolder}
            <div className={styles.campaigns_wrapper}>
                <div className={styles.campaigns_topComponent}>
                    <div className={styles.campaigns_topComponent_banner}>
                        <h1 className={styles.campaigns_topComponent_title}>NFTs List</h1>
                        <p className={styles.campaigns_topComponent_desc}>
                            A place to purchase NFTs you like. All the money collected will be used
                            for donations.
                        </p>
                        {isAdmin && (
                            <Button
                                onClick={showModalNFT}
                                style={{ height: "45px" }}
                                type="primary"
                            >
                                Add NFTs
                            </Button>
                        )}
                        <Modal
                            open={openNFT}
                            title="Add NFT Listing"
                            onOk={approveAndList}
                            onCancel={handleCancelNFT}
                            footer={[
                                <Button key="back" onClick={handleCancelNFT}>
                                    Return
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={isAddingNft}
                                    onClick={approveAndList}
                                >
                                    Add
                                </Button>,
                            ]}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <p>NFT address</p>
                                <Input
                                    value={nftAddrInput}
                                    onChange={(e) => {
                                        setNftAddrInput(e.target.value);
                                    }}
                                />
                                <p>Token ID</p>
                                <Input
                                    value={tokenIdInput}
                                    onChange={(e) => {
                                        setTokenIdInput(e.target.value);
                                    }}
                                />
                                <p>Price (ETH)</p>
                                <Input
                                    value={nftPriceInput}
                                    onChange={(e) => {
                                        setNftPriceInput(e.target.value);
                                    }}
                                />
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={styles.campaigns_midComponent}>
                    {activeItems &&
                        activeItems.map((item) => {
                            return (
                                <div className={styles.campaignCard}>
                                    <CampaignCard
                                        title={item.title}
                                        price={item.price}
                                        nftAddress={item.nftAddress}
                                        tokenId={item.tokenId}
                                        key={`${item.nftAddress}${item.tokenId}`}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className={styles.campaigns_botComponent}></div>
            </div>
        </>
    );
}
