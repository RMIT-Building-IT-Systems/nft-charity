import CampaignCard from "./campaigncard";
import styles from "../../styles/Campaigns.module.css";
import { Button } from "antd";
import { useQuery } from "@apollo/client";

import useAdmin from "../../hooks/useAdmin";
import GET_LISTED_NFTS from "../../constants/subgraph/getListedNft";

export default function NftListing() {
    const { isAdmin } = useAdmin();
    const { loading, error, data: listedNfts } = useQuery(GET_LISTED_NFTS);
    const activeItems = listedNfts?.activeItems;

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
                        <Button style={{ height: "45px" }} type="primary">
                            Add NFTs
                        </Button>
                    )}
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
    );
}
