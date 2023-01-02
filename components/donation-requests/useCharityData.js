import { useState, useEffect, useCallback } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../../constants/ethereum/nftCharityContract";

export default () => {
    const [balance, setBalance] = useState();
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [donatorsCount, setDonatorsCount] = useState();
    const [isLoadingDonatorsCount, setIsLoadingDonatorsCount] = useState(true);
    const [moneyAvailable, setMoneyAvailable] = useState();
    const [isLoadingMoneyAvailable, setIsLoadingMoneyAvailable] = useState(true);

    const { isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract();

    const getBalance = useCallback(async () => {
        setIsLoadingBalance(true);
        const getBalanceOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getCurrentBalance",
            params: {},
        };
        await runContractFunction({
            params: getBalanceOptions,
            onSuccess: (balance) => {
                setBalance(balance / 10 ** 18);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingBalance(false);
    }, [runContractFunction]);

    const getDonatorsCount = useCallback(async () => {
        setIsLoadingDonatorsCount(true);
        const getDonatorsCountOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getDonatorsCount",
            params: {},
        };
        await runContractFunction({
            params: getDonatorsCountOptions,
            onSuccess: (donatorsCount) => {
                setDonatorsCount(donatorsCount);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingDonatorsCount(false);
    }, [runContractFunction]);

    const getMoneyAvailable = useCallback(async () => {
        setIsLoadingMoneyAvailable(true);
        const getMoneyAvailableOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getMoneyAvailableForRequests",
            params: {},
        };
        await runContractFunction({
            params: getMoneyAvailableOptions,
            onSuccess: (moneyAvailable) => {
                setMoneyAvailable(moneyAvailable / 10 ** 18);
            },
            onFailure: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingMoneyAvailable(false);
    }, [runContractFunction]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getBalance();
        }
    }, [isWeb3Enabled, getBalance]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getMoneyAvailable();
        }
    }, [isWeb3Enabled, getMoneyAvailable]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getDonatorsCount();
        }
    }, [isWeb3Enabled, getDonatorsCount]);

    return {
        balance,
        isLoadingBalance,
        donatorsCount,
        isLoadingDonatorsCount,
        moneyAvailable,
        isLoadingMoneyAvailable,
    };
};
