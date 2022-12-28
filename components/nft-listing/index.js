import CampaignCard from "./campaigncard";
import styles from "../../styles/Campaigns.module.css";
import { Button } from "antd";

import useAdmin from "../../hooks/useAdmin";
import { campaignsData } from "./fakeData_campaign";

export default function NftListing() {
    const { isAdmin } = useAdmin();
    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    <h1 className={styles.campaigns_topComponent_title}>NFTs List</h1>
                    <p className={styles.campaigns_topComponent_desc}>
                        A place to purchase NFTs you like. All the money collected will be used for
                        donations.
                    </p>
                    {isAdmin && (
                        <Button style={{ height: "45px" }} type="primary" danger>
                            Add NFTs
                        </Button>
                    )}
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
