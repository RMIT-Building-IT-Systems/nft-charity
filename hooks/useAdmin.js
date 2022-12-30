import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import useSCCharityFunction from "./useSCCharityFunction";

export default () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { account } = useMoralis();

    const { runSCCharityFunction: getAdminAddr } = useSCCharityFunction("getAdmin", {});

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
