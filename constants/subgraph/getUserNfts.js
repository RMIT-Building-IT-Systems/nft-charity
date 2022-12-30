import { gql } from "@apollo/client";

const GET_USER_NFTS = gql`
    query UserNfts($buyer: String!) {
        activeItems(where: { buyer: $buyer }) {
            id
            buyer
            nftAddress
            tokenId
            price
        }
    }
`;

export default GET_USER_NFTS;
