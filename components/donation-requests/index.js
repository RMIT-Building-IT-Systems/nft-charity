import styles from "../../styles/donation-requests.module.css";
import TabbarCustom from "./tabbar-custom";
import * as ethers from "ethers";
import React, { useState, useContext } from "react";
import { Button, Modal, Input } from "antd";

import { AdminContext } from "../../hooks/AdminContextProvider";
import useCharityData from "./useCharityData";
import useNotification from "../../hooks/useNotification";
import { useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../../constants/ethereum/nftCharityContract";
import CharityDataBox from "./CharityDataBox";

export default function DonationRequests() {
    const [openRq, setOpenRq] = useState(false);
    const [isAddingRequest, setIsAddingRequest] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [receiverInput, setReceiverInput] = useState("");
    const [dayLastInput, setDayLastInput] = useState("");

    const { isAdmin } = useContext(AdminContext);
    const {
        balance,
        isLoadingBalance,
        donatorsCount,
        isLoadingDonatorsCount,
        moneyAvailable,
        isLoadingMoneyAvailable,
    } = useCharityData();

    const { raiseSuccess, raiseFailure, notificationContextHolder } = useNotification();
    const { runContractFunction } = useWeb3Contract();

    const addRequest = async () => {
        setIsAddingRequest(false);
        const addRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "createRequest",
            params: {
                description: descriptionInput,
                value: ethers.utils.parseEther(amountInput),
                recipient: receiverInput,
                dayLast: dayLastInput,
            },
        };

        await runContractFunction({
            params: addRequestOptions,
            onSuccess: () => {
                setIsAddingRequest(false);
                raiseSuccess("Request added successfully!");
                setOpenRq(false);
                setDescriptionInput("");
                setAmountInput("");
                setReceiverInput("");
                setDayLastInput("");
            },
            onError: (error) => {
                console.log(error);
                setIsAddingRequest(false);
                raiseFailure("Error adding request!");
            },
        });
    };

    const showModalRq = () => {
        setOpenRq(true);
    };
    const handleCancelRq = () => {
        setOpenRq(false);
    };

    return (
        <>
            {notificationContextHolder}
            <div className={styles.donationRequests_wrapper}>
                <div className={styles.donationRequests_topComponent}>
                    <div className={styles.donationRequests_topComponent_banner}>
                        <h1 className={styles.donationRequests_topComponent_title}>
                            Donation Requests
                        </h1>
                        <p className={styles.donationRequests_topComponent_desc}>
                            A place to purchase NFTs you like. All the money collected will be used
                            for donations.
                        </p>
                        {isAdmin && (
                            <div className={styles.donationRequests_topComponent_buttons}>
                                <Button
                                    onClick={showModalRq}
                                    className={styles.donationRequests_topComponent_button}
                                    style={{ height: "45px", width: "145px" }}
                                    type="primary"
                                    danger
                                >
                                    Add Request
                                </Button>
                            </div>
                        )}
                        <Modal
                            open={openRq}
                            title="Add Request"
                            onOk={addRequest}
                            onCancel={handleCancelRq}
                            footer={[
                                <Button key="back" onClick={handleCancelRq}>
                                    Cancel
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={isAddingRequest}
                                    onClick={addRequest}
                                >
                                    Add
                                </Button>,
                            ]}
                        >
                            <p>Description</p>
                            <Input
                                onChange={(e) => {
                                    setDescriptionInput(e.target.value);
                                }}
                            />
                            <p>Amount</p>
                            <Input
                                onChange={(e) => {
                                    setAmountInput(e.target.value);
                                }}
                            />
                            <p>Receiver</p>
                            <Input
                                onChange={(e) => {
                                    setReceiverInput(e.target.value);
                                }}
                            />
                            <p>Day Last</p>
                            <Input
                                onChange={(e) => {
                                    setDayLastInput(e.target.value);
                                }}
                            />
                        </Modal>
                    </div>
                </div>
                <div style={{ display: "flex", margin: "1rem 50px", gap: "1rem" }}>
                    <CharityDataBox
                        title="Balances"
                        value={balance}
                        prefix={null}
                        suffix={"ETH"}
                        loading={isLoadingBalance}
                    />
                    <CharityDataBox
                        title="Available funds for new Requests"
                        value={moneyAvailable}
                        prefix={null}
                        suffix={"ETH"}
                        loading={isLoadingMoneyAvailable}
                    />
                    <CharityDataBox
                        title="Number of Donators"
                        value={donatorsCount}
                        prefix={null}
                        suffix={null}
                        loading={isLoadingDonatorsCount}
                    />
                </div>
                <div className={styles.donationRequests_midComponent}>
                    <TabbarCustom isAdmin={isAdmin} donatorsCount={donatorsCount} />
                </div>
            </div>
        </>
    );
}
