import styles from "../../styles/donation-requests.module.css"
import TableCustom from "./table-custom"
import TabbarCustom from "./tabbar-custom"

export default function DonationRequests(){
    return(
        <div className={styles.donationRequests_wrapper}>
        <div className={styles.donationRequests_topComponent}>
            <div className={styles.donationRequests_topComponent_banner}>
                <h1 className={styles.donationRequests_topComponent_title}>Donation Requests</h1>
                <p className={styles.donationRequests_topComponent_desc}>
                    A place to purchase NFTs you like. All the money collected will be used for
                    donations.
                </p>
            </div>
        </div>
        <div className={styles.donationRequests_midComponent}>
            {/* <TableCustom table_type={"active"} isAdmin={true} /> */}
            <TabbarCustom isAdmin={true} />
        </div>
        </div>
    )
}