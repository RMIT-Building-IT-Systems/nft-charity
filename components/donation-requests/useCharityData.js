import { useState, useEffect } from "react";
import useSCCharityFunction from "../../hooks/useSCCharityFunction";

export default () => {
    const [balance, setBalance] = useState();
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [donatorsCount, setDonatorsCount] = useState();
    const [isLoadingDonatorsCount, setIsLoadingDonatorsCount] = useState(true);
    const [moneyAvailable, setMoneyAvailable] = useState();
    const [isLoadingMoneyAvailable, setIsLoadingMoneyAvailable] = useState(true);

    const { runSCCharityFunction: getBalanceSC } = useSCCharityFunction("getCurrentBalance", {});

    const { runSCCharityFunction: getDonatorsCountSC } = useSCCharityFunction(
        "getDonatorsCount",
        {}
    );

    const { runSCCharityFunction: getMoneyAvailableSC } = useSCCharityFunction(
        "getMoneyAvailableForRequests",
        {}
    );

    useEffect(() => {
        const getBalance = async () => {
            const balance = await getBalanceSC();
            setBalance(balance / 10 ** 18);
            setIsLoadingBalance(false);
        };
        getBalance();
    }, [getBalanceSC]);

    useEffect(() => {
        const getMoneyAvailable = async () => {
            const moneyAvailable = await getMoneyAvailableSC();
            setMoneyAvailable(moneyAvailable / 10 ** 18);
            setIsLoadingMoneyAvailable(false);
        };
        getMoneyAvailable();
    }, [getMoneyAvailableSC]);

    useEffect(() => {
        const getDonatorsCount = async () => {
            const donatorsCount = await getDonatorsCountSC();
            setDonatorsCount(donatorsCount);
            setIsLoadingDonatorsCount(false);
        };
        getDonatorsCount();
    }, [getDonatorsCountSC]);

    return {
        balance,
        isLoadingBalance,
        donatorsCount,
        isLoadingDonatorsCount,
        moneyAvailable,
        isLoadingMoneyAvailable,
    };
};
