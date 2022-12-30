import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Popover } from "antd";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { useMoralis } from "react-moralis";

import shortenAddress from "../utils/frontend/shortenAddress";
import useAdmin from "../hooks/useAdmin";

const Header = () => {
    const router = useRouter();
    const route = router.pathname;
    const { enableWeb3, account, isWeb3EnableLoading, isWeb3Enabled, Moralis, deactivateWeb3 } =
        useMoralis();
    const [open, setOpen] = useState(false);

    const { isAdmin } = useAdmin();

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleAuth = async () => {
        if (isWeb3Enabled) return;
        await enableWeb3();
        if (typeof window !== "undefined") {
            window.localStorage.setItem("connected", "inject");
        }
    };

    const handleLogout = async () => {
        window.localStorage.removeItem("connected");
        await deactivateWeb3();
    };

    const contentUserAvatar = (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {!isAdmin && (
                <Button href="/user-nft-listing">
                    <h3 style={{ color: route === "/user-nft-listing" ? "#1777FE" : "#3c4048" }}>
                        Your NFTs
                    </h3>
                </Button>
            )}
            <Button onClick={handleLogout} danger={true} href="/user-nft-listing">
                <h3 style={{ color: route === "/user-nft-listing" ? "#1777FE" : "#3c4048" }}>
                    Log out
                </h3>
            </Button>
        </div>
    );

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3();
            }
        }
    }, []);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account === null) {
                handleLogout();
            }
        });
    });

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
                <HeaderNavItem title="Donation Requests" urlPath={"/donation-requests"} />
            </div>
            <div className="app-header-right">
                <Button
                    loading={isWeb3EnableLoading}
                    onClick={handleAuth}
                    style={{ width: "175px", height: "37.5px" }}
                >
                    <h3>{account ? shortenAddress(account) : "Connect"}</h3>
                </Button>
                {isWeb3Enabled && (
                    <Popover
                        content={contentUserAvatar}
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FaRegUserCircle size={30} color="#3c4048" />
                        </div>
                    </Popover>
                )}
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
