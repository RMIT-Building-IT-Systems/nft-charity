import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "antd";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";

const Header = () => {
    const router = useRouter();
    const route = router.pathname;

    return (
        <div className="app-header">
            <div className="add-header-left">
                <BiDonateHeart size={40} color="#3c4048" />
                <h2 className="app-header-title">NFT Charity</h2>
            </div>
            <div className="app-header-navigation">
                <Link href="/">
                    <div
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <FaHome size={30} color={route === "/" ? "#1777FE" : "#3c4048"} />
                    </div>
                </Link>
                <HeaderNavItem title="About Us" urlPath={"/about-us"} />
                <HeaderNavItem title="NFT List" urlPath={"/nft-listing"} />
                <HeaderNavItem title="Personal NFT List" urlPath={"/user-nft-listing"} />
                <HeaderNavItem title="Donation Requests" urlPath={"/donation-requests"} />
            </div>
            <div className="app-header-right">
                <Button style={{ width: "175px", height: "37.5px" }}>
                    <h3>Connect</h3>
                </Button>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <FaRegUserCircle size={30} color="#3c4048" />
                </div>
            </div>
        </div>
    );
};

const HeaderNavItem = ({ title, urlPath }) => {
    const router = useRouter();
    const route = router.pathname;

    return (
        <Link href={urlPath}>
            <h3 style={{ color: route === urlPath ? "#1777FE" : "#3c4048" }}>{title}</h3>
        </Link>
    );
};

export default Header;
