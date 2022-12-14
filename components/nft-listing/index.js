import Compaigncard from './campaigncard'
import Image from 'next/image'
import styles from '../../styles/Campaigns.module.css'
import { campaignsData } from './fakeData_campaign'

export default function NftListing() {
    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    <h1 className={styles.campaigns_topComponent_title}>Explore NFTs Campaigns</h1>
                    <p className={styles.campaigns_topComponent_desc}>Collect, trade and sell in-game items, plus explore a wide range of collectible trade</p>
                </div>
            </div>
            <div className={styles.campaigns_midComponent}>
                {campaignsData.map(d => {
                    return (
                        <div className={styles.campaignCard}><Compaigncard title={d.title} cover={d.cover} price={d.price} duration={d.duration} />
                        </div>)
                })
                }
            </div>
            <div className={styles.campaigns_botComponent}></div>
        </ div>
    )
}