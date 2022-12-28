import { useMoralis } from "react-moralis";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NftListing from "../../components/nft-listing";

export default () => {
    const { isWeb3Enabled } = useMoralis();
    return (
        <div>
            <Header />
            {isWeb3Enabled ? (
                <NftListing />
            ) : (
                <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                    Please connect to MetaMask!
                </h2>
            )}
            <Footer />
        </div>
    );
};
