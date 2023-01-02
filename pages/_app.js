import "../styles/globals.css";
import "../styles/app.css";
import "../styles/home-page.css";
import "../styles/about-us.css";
import { MoralisProvider } from "react-moralis";
import { AdminContextProvider } from "../hooks/AdminContextProvider";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/37020/nft-charity/v0.0.2",
});

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <ApolloProvider client={client}>
                <AdminContextProvider>
                    <Component {...pageProps} />
                </AdminContextProvider>
            </ApolloProvider>
        </MoralisProvider>
    );
}

export default MyApp;
