import UserNft from "./userNft";
import styles from "../../styles/Campaigns.module.css";
import { useMoralis } from "react-moralis";
import { useQuery } from "@apollo/client";

import GET_USER_NFTS from "../../constants/subgraph/getUserNfts";

export default function UserNftListing() {
    const { account } = useMoralis();
    const {
        loading: _,
        error: __,
        data,
    } = useQuery(GET_USER_NFTS, {
        variables: { buyer: account },
    });
    const userNfts = data?.activeItems;

    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    <h1 className={styles.campaigns_topComponent_title}>Your NFTs List</h1>
                    <p className={styles.campaigns_topComponent_desc}>
                        A place to view NFTs you have bought. All the money collected will be used
                        for donations.
                    </p>
                </div>
            </div>
            <div className={styles.campaigns_midComponent}>
                {userNfts &&
                    userNfts.map((item) => {
                        return (
                            <div className={styles.campaignCard}>
                                <UserNft
                                    title={item.title}
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
