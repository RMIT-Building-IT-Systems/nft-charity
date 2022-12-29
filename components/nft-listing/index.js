import CampaignCard from "./campaigncard";
import styles from "../../styles/Campaigns.module.css";
import { campaignsData } from "./fakeData_campaign";
import React, { useState } from 'react';
import {Button, Modal, Input} from 'antd'

export default function NftListing() {
    const [loadingNFT, setLoadingNFT] = useState(false);
    const [openNFT, setOpenNFT] = useState(false);
    const showModalNFT = () => {
        setOpenNFT(true);
    };
    const handleOkNFT = () => {
        setLoadingNFT(true);
        setTimeout(() => {
            setLoadingNFT(false);
            setOpenNFT(false);
        }, 3000);
    };
    const handleCancelNFT = () => {
        setOpenNFT(false);
    };
    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    <h1 className={styles.campaigns_topComponent_title}>NFTs List</h1>
                    <p className={styles.campaigns_topComponent_desc}>
                        A place to purchase NFTs you like. All the money collected will be used for
                        donations.
                    </p>
                    <Button onClick={showModalNFT} style={{height: "45px"}}  type="primary" danger>Add NFTs</Button>
                    <Modal
                        open={openNFT}
                        title="Add NFT Listing"
                        onOk={handleOkNFT}
                        onCancel={handleCancelNFT}
                        footer={[
                        <Button key="back" onClick={handleCancelNFT}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loadingNFT} onClick={handleOkNFT}>
                            Submit
                        </Button>
                        ]}
                    >   
                        <p>NFT address</p>
                        <Input />
                        <p>Token ID</p>
                        <Input />
                    </Modal>
                </div>
            </div>
            <div className={styles.campaigns_midComponent}>
                {campaignsData.map((d) => {
                    return (
                        <div className={styles.campaignCard}>
                            <CampaignCard
                                title={d.title}
                                cover={d.cover}
                                price={d.price}
                                duration={d.duration}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.campaigns_botComponent}></div>
        </div>
    );
}
