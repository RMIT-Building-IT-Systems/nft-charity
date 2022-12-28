import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../constants/ethereum/nftCharityContract";
import useSCCharityFunction from "./useSCCharityFunction";

export default () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { account } = useMoralis();

    const { runSCCharityFunction } = useSCCharityFunction("getAdmin", {});

    const { runContractFunction: getAdminAddr } = useWeb3Contract({
        abi: nftCharityContractAbi,
        contractAddress: nftCharityContractAddr,
        functionName: "getAdmin",
        params: {},
    });

    useEffect(() => {
        const getAdmin = async () => {
            if (!account) return;
            const adminAddr = await runSCCharityFunction("getAdmin", {});
            setIsAdmin(account.toLowerCase() === adminAddr.toLowerCase());
        };
        getAdmin();
    }, [account, getAdminAddr, runSCCharityFunction]);

    return {
        isAdmin,
    };
};
