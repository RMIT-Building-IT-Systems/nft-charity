import { useWeb3Contract } from "react-moralis";
import {
    nftCharityContractAddr,
    nftCharityContractAbi,
} from "../constants/ethereum/nftCharityContract";

export default (funcName, params) => {
    const { runContractFunction } = useWeb3Contract({
        abi: nftCharityContractAbi,
        contractAddress: nftCharityContractAddr,
        functionName: funcName,
        params: params,
    });

    const runSCCharityFunction = async () => {
        const result = await runContractFunction();
        return result;
    };

    return { runSCCharityFunction };
};
