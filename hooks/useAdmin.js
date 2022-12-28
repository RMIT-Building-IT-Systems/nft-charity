import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../constants/ethereum/nftCharityContract";

export default () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { account } = useMoralis();

    const { runContractFunction: getAdminAddr } = useWeb3Contract({
        abi: nftCharityContractAbi,
        contractAddress: nftCharityContractAddr,
        functionName: "getAdmin",
        params: {},
    });

    useEffect(() => {
        const getAdmin = async () => {
            if (!account) return;
            const adminAddr = await getAdminAddr();
            setIsAdmin(account.toLowerCase() === adminAddr.toLowerCase());
        };
        getAdmin();
    }, [account, getAdminAddr]);

    return {
        isAdmin,
    };
};
