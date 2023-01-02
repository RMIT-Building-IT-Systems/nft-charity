import { createContext, useState, useEffect, useCallback } from "react";

import { useWeb3Contract, useMoralis } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../constants/ethereum/nftCharityContract";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { account } = useMoralis();

    const { runContractFunction } = useWeb3Contract();

    const getIsAdmin = useCallback(async () => {
        if (!account) return;
        const getAdminOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getAdmin",
            params: {},
        };
        const adminAddr = await runContractFunction({
            params: getAdminOptions,
        });
        setIsAdmin(account.toLowerCase() === adminAddr.toLowerCase());
    }, [runContractFunction, account]);

    useEffect(() => {
        getIsAdmin();
    }, [getIsAdmin]);

    return <AdminContext.Provider value={{ isAdmin }}>{children}</AdminContext.Provider>;
};
