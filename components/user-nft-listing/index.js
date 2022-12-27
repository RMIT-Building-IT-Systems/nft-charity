import CampaignCard from "./campaigncard";
import styles from "../../styles/Campaigns.module.css";
import { campaignsData } from "./fakeData_campaign";

export default function UserNftListing() {
    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    <h1 className={styles.campaigns_topComponent_title}>Personal NFTs List</h1>
                    <p className={styles.campaigns_topComponent_desc}>
                        A place to view NFTs you have bought. All the money collected will be used for
                        donations.
                    </p>
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
