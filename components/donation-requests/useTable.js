import { useState, useEffect } from "react";
import useSCCharityFunction from "../../hooks/useSCCharityFunction";

import { useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../../constants/ethereum/nftCharityContract";
import useNotification from "../../hooks/useNotification";

export default () => {
    const [activeRequests, setActiveRequests] = useState([]);
    const [expiredRequests, setExpiredRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [isLoadingActiveTable, setIsLoadingActiveTable] = useState(true);
    const [isLoadingExpiredTable, setIsLoadingExpiredTable] = useState(true);
    const [isLoadingCompletedTable, setIsLoadingCompletedTable] = useState(true);
    const [isLoadingRejectedTable, setIsLoadingRejectedTable] = useState(true);

    const { runContractFunction } = useWeb3Contract();
    const { raiseSuccess, raiseFailure, notificationContextHolder } = useNotification();

    const { runSCCharityFunction: getActiveRequestsSC } = useSCCharityFunction(
        "getAvailableRequests",
        {}
    );

    const { runSCCharityFunction: getExpiredRequestsSC } = useSCCharityFunction(
        "getExpiredRequests",
        {}
    );

    const { runSCCharityFunction: getCompletedRequestsSC } = useSCCharityFunction(
        "getCompletedRequests",
        {}
    );

    const { runSCCharityFunction: getRejectedRequestsSC } = useSCCharityFunction(
        "getRejectedRequests",
        {}
    );

    const approveRequest = async (index) => {
        const approveRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "approveRequest",
            params: {
                index: index,
            },
        };
        await runContractFunction({
            params: approveRequestOptions,
            onSuccess: () => {
                raiseSuccess("Request approved successfully!");
            },
            onFailure: (error) => {
                console.log(error);
                raiseFailure("Error approving request!");
            },
        });
    };

    const rejectRequest = async (index) => {
        const approveRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "rejectRequest",
            params: {
                index: index,
            },
        };
        await runContractFunction({
            params: approveRequestOptions,
            onSuccess: () => {
                raiseSuccess("Request rejected successfully!");
            },
            onFailure: (error) => {
                console.log(error);
                raiseFailure("Error rejecting request!");
            },
        });
    };

    const completeRequest = async (index) => {
        const approveRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "completeRequest",
            params: {
                index: index,
            },
        };
        await runContractFunction({
            params: approveRequestOptions,
            onSuccess: () => {
                raiseSuccess("Request completed!");
            },
            onFailure: (error) => {
                console.log(error);
                raiseFailure("Error completing request!");
            },
        });
    };

    useEffect(() => {
        const getActiveRequests = async () => {
            const requests = await getActiveRequestsSC();
            setActiveRequests(requests);
            setIsLoadingActiveTable(false);
        };
        getActiveRequests();
    }, []);

    useEffect(() => {
        const getExpiredRequests = async () => {
            const requests = await getExpiredRequestsSC();
            setExpiredRequests(requests);
            setIsLoadingExpiredTable(false);
        };
        getExpiredRequests();
    }, []);

    useEffect(() => {
        const getCompletedRequests = async () => {
            const requests = await getCompletedRequestsSC();
            setCompletedRequests(requests);
            setIsLoadingCompletedTable(false);
        };
        getCompletedRequests();
    }, []);

    useEffect(() => {
        const getRejectedRequests = async () => {
            const requests = await getRejectedRequestsSC();
            setRejectedRequests(requests);
            setIsLoadingRejectedTable(false);
        };
        getRejectedRequests();
    }, []);

    return {
        activeRequests,
        expiredRequests,
        completedRequests,
        rejectedRequests,
        isLoadingActiveTable,
        isLoadingExpiredTable,
        isLoadingCompletedTable,
        isLoadingRejectedTable,
        approveRequest,
        rejectRequest,
        completeRequest,
        notificationContextHolder,
    };
};
