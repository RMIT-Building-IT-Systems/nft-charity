const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-details">
                <h1 style={{ fontSize: 50, textAlign: "center" }}>About Us</h1>
                <div
                    style={{
                        height: "5px",
                        backgroundColor: "#3c4048",
                        borderRadius: "2.5px",
                        width: "20%",
                        margin: "1rem auto",
                    }}
                />
                <p style={{ lineHeight: 2, marginTop: "2rem", fontSize: "1.15rem" }}>
                    NFT Charity is a place where donators can come and donate their money by
                    purchasing NFTs. Donators can choose the NFTs they want to have in the NFT List
                    page and use by cryptocurrencies to pay for them. All transactions are available
                    to check on the blockchain and all the money received from donators will be
                    stored by a smart contract, not allowing any party to have control over it.
                    After successfully purchasing an NFT, users will marked as donators and they can
                    have the right to approve or decline a transaction to donate some amount of
                    money from the fund to a non-profit organization.
                </p>
            </div>
            <img className="about-us-img" src="/about-us.png" />
        </div>
    );
};

export default AboutUs;
