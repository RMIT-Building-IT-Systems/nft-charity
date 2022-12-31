import { useState, useEffect } from "react";
import useSCCharityFunction from "../../hooks/useSCCharityFunction";

export default () => {
    const [activeRequests, setActiveRequests] = useState([]);
    const [expiredRequests, setExpiredRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [isLoadingActiveTable, setIsLoadingActiveTable] = useState(true);
    const [isLoadingExpiredTable, setIsLoadingExpiredTable] = useState(true);
    const [isLoadingCompletedTable, setIsLoadingCompletedTable] = useState(true);
    const [isLoadingRejectedTable, setIsLoadingRejectedTable] = useState(true);

    const { runSCCharityFunction: getActiveRequestsSC } = useSCCharityFunction(
        "getAvailableRequests",
        {}
    );

    const { runSCCharityFunction: getExpiredRequestsSC } = useSCCharityFunction(
        "getExpiredRequestsSC",
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

    useEffect(() => {
        const getActiveRequests = async () => {
            const requests = await getActiveRequestsSC();
            setActiveRequests(requests);
            setIsLoadingActiveTable(false);
        };
        getActiveRequests();
    }, [getActiveRequestsSC]);

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
    };
};
