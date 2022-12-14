import Link from "next/link";
import { Button } from "antd";

const PagesIntro = () => {
    return (
        <div className="homepage-pages-intro">
            <PagesIntroItem
                title="NFTs Listing"
                urlPath="/nft-listing"
                description="A place for users to buy NFTs. All the money collected will be donated to different addresses based on donators's choices in the Donation Requests page."
                image="/homepage-pageIntro-1.png"
            />
            <PagesIntroItem
                title="Donation Requests"
                urlPath="/donation-requests"
                description="The website will list all the donation requests for donators' to vote. Donation transactions can only be executed if there are enough votes from donators. A charity that is 100% controlled by the people."
                image="/homepage-pageIntro-2.png"
                reversed
            />
        </div>
    );
};

const PagesIntroItem = ({ title, description, urlPath, image, reversed }) => {
    return (
        <div
            style={{ flexDirection: reversed ? "row-reverse" : "row" }}
            className="homepage-pages-intro-item"
        >
            <div className="homepage-pages-intro-item-text">
                <h3 style={{ fontSize: 30 }}>{title}</h3>
                <p style={{ lineHeight: 1.5 }}>{description}</p>
                <Link href={urlPath}>
                    <Button type="primary" style={{ height: "40px" }}>Go to page</Button>
                </Link>
            </div>
            <img className="homepage-pages-intro-item-img" src={image} />
        </div>
    );
};

export default PagesIntro;
