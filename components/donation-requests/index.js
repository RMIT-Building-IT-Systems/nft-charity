import styles from "../../styles/donation-requests.module.css"
import TabbarCustom from "./tabbar-custom"
import React, { useState } from 'react';
import { Button, Modal, Input } from "antd"

export default function DonationRequests(){
    const [loadingRq, setLoadingRq] = useState(false);
    const [openRq, setOpenRq] = useState(false);

    const showModalRq = () => {
        setOpenRq(true);
    };
    const handleOkRq = () => {
        setLoadingRq(true);
        setTimeout(() => {
            setLoadingRq(false);
            setOpenRq(false);
        }, 3000);
    };
    const handleCancelRq = () => {
        setOpenRq(false);
    };
    return(
        <div className={styles.donationRequests_wrapper}>
        <div className={styles.donationRequests_topComponent}>
            <div className={styles.donationRequests_topComponent_banner}>
                <h1 className={styles.donationRequests_topComponent_title}>Donation Requests</h1>
                <p className={styles.donationRequests_topComponent_desc}>
                    A place to purchase NFTs you like. All the money collected will be used for
                    donations.
                </p>
                <div className={styles.donationRequests_topComponent_buttons}>
                    <Button onClick={showModalRq}  className={styles.donationRequests_topComponent_button} style={{height: "45px",  width: "145px"}}  type="primary" danger>Add Request</Button>
                </div>
                <Modal
                    open={openRq}
                    title="Add Request"
                    onOk={handleOkRq}
                    onCancel={handleCancelRq}
                    footer={[
                    <Button key="back" onClick={handleCancelRq}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loadingRq} onClick={handleOkRq}>
                        Submit
                    </Button>
                    ]}
                >   
                    <p>Description</p>
                    <Input />
                    <p>Amount</p>
                    <Input />
                    <p>Receiver</p>
                    <Input />
                </Modal>
            </div>
        </div>
        <div className={styles.donationRequests_midComponent}>
            {/* <TableCustom table_type={"active"} isAdmin={true} /> */}
            <TabbarCustom isAdmin={true} />
        </div>
        </div>
    )
}