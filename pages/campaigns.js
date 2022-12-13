import Compaigncard from './components/campaigncard'
import Image from 'next/image'
import styles from '../styles/Campaigns.module.css'
import { campaignsData } from './components/fakeData_campaign'
import campaignCover from '../images/banner/banner-campaigns.jpg'
export default function campaigns() {
    return (
        <div className={styles.campaigns_wrapper}>
            <div className={styles.campaigns_topComponent}>
                <div className={styles.campaigns_topComponent_banner}>
                    {/* <img className={styles.campaigns_topComponent_banner} /> */}
                </div>
                <h1 className={styles.campaigns_topComponent_title}>Explore NFTs Campaigns</h1>
                <p className={styles.campaigns_topComponent_desc}>Collect, trade and sell in-game items, plus explore a wide range of collectible trading cards</p>
            </div>
            <div className={styles.campaigns_midComponent}>
                {campaignsData.map(d => {
                    return (
                        <div className={styles.campaignCard}><Compaigncard title={d.title} cover={d.cover} description={d.description} avatar={d.avatar} />
                        </div>)
                })
                }
            </div>
            <div className={styles.campaigns_botComponent}></div>
        </ div>
    )
}