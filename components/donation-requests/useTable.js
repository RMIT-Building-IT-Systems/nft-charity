import { useState, useEffect, useCallback } from "react";

import { useWeb3Contract, useMoralis } from "react-moralis";
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

    const { isWeb3Enabled } = useMoralis();
    const { runContractFunction } = useWeb3Contract();
    const { raiseSuccess, raiseFailure, notificationContextHolder } = useNotification();

    const getActiveRequests = useCallback(async () => {
        setIsLoadingActiveTable(true);
        const getActiveRequestsOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getAvailableRequests",
            params: {},
        };
        await runContractFunction({
            params: getActiveRequestsOptions,
            onSuccess: (activeRequests) => {
                setActiveRequests(activeRequests);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingActiveTable(false);
    }, [runContractFunction, setIsLoadingActiveTable]);

    const getExpiredRequests = useCallback(async () => {
        setIsLoadingExpiredTable(true);
        const isExpiredRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getExpiredRequests",
            params: {},
        };
        await runContractFunction({
            params: isExpiredRequestOptions,
            onSuccess: (expiredRequests) => {
                setExpiredRequests(expiredRequests);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingExpiredTable(false);
    }, [runContractFunction]);

    const getRejectedRequests = useCallback(async () => {
        setIsLoadingRejectedTable(true);
        const isApproveRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getRejectedRequests",
            params: {},
        };
        await runContractFunction({
            params: isApproveRequestOptions,
            onSuccess: (rejectedRequests) => {
                setRejectedRequests(rejectedRequests);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingRejectedTable(false);
    }, [runContractFunction]);

    const getCompletedRequests = useCallback(async () => {
        setIsLoadingCompletedTable(true);
        const isApproveRequestOptions = {
            abi: nftCharityContractAbi,
            contractAddress: nftCharityContractAddr,
            functionName: "getCompletedRequests",
            params: {},
        };
        await runContractFunction({
            params: isApproveRequestOptions,
            onSuccess: (completedRequests) => {
                setCompletedRequests(completedRequests);
            },
            onError: (error) => {
                console.log("error :", error);
            },
        });
        setIsLoadingCompletedTable(false);
    }, [runContractFunction]);

    const getIsApproveRequest = useCallback(
        async (index) => {
            const isApproveRequestOptions = {
                abi: nftCharityContractAbi,
                contractAddress: nftCharityContractAddr,
                functionName: "getIsApproveRequest",
                params: {
                    index: index,
                },
            };
            await runContractFunction({
                params: isApproveRequestOptions,
                onSuccess: (isApproveRequest) => {
                    return isApproveRequest;
                },
                onError: (error) => {
                    console.log("error :", error);
                    return false;
                },
            });
        },
        [runContractFunction]
    );

    const approveRequest = useCallback(
        async (index) => {
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
        },
        [runContractFunction, raiseSuccess, raiseFailure]
    );

    const rejectRequest = useCallback(
        async (index) => {
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
        },
        [runContractFunction, raiseSuccess, raiseFailure]
    );

    const completeRequest = useCallback(
        async (index) => {
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
        },
        [runContractFunction, raiseSuccess, raiseFailure]
    );

    useEffect(() => {
        if (isWeb3Enabled) {
            getActiveRequests();
        }
    }, [isWeb3Enabled, getActiveRequests]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getExpiredRequests();
        }
    }, [isWeb3Enabled, getExpiredRequests]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getRejectedRequests();
        }
    }, [isWeb3Enabled, getRejectedRequests]);

    useEffect(() => {
        if (isWeb3Enabled) {
            getCompletedRequests();
        }
    }, [isWeb3Enabled, getCompletedRequests]);

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
        getIsApproveRequest,
        notificationContextHolder,
    };
};
