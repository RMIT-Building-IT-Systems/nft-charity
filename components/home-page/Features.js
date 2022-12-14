const Features = () => {
    return (
        <div className="homepage-features">
            <h2 style={{ textAlign: "center", fontSize: "32.5px", marginBottom: "2.5rem" }}>
                Why doing charity with NFTs?
            </h2>
            <div className="homepage-features-columns">
                <FeatureItem
                    image="/homepage-easy.png"
                    title="Easy"
                    description="Money transfered directly without any intermediaries"
                />
                <FeatureItem
                    image="/homepage-fun.png"
                    title="Fun"
                    description="Donators get NFTs representing their contribution"
                />
                <FeatureItem
                    image="/homepage-trust.png"
                    title="Trustworthy"
                    description="All transactions are recorded and users control all the donations"
                />
            </div>
        </div>
    );
};

const FeatureItem = ({ image, title, description }) => {
    return (
        <div className="homepage-features-item">
            <img className="homepage-features-item-img" src={image} />
            <h3 style={{ fontSize: 25 }}>{title}</h3>
            <p style={{ padding: "0 4rem", color: "#bbbbbb", lineHeight: 1.25 }}>{description}</p>
        </div>
    );
};

export default Features;
