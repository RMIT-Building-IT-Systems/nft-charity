import { gql } from "@apollo/client";

const GET_LISTED_NFTS = gql`
    {
        activeItems(where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            buyer
            nftAddress
            tokenId
            price
        }
    }
`;

export default GET_LISTED_NFTS;
