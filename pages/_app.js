import "../styles/globals.css";
import "../styles/app.css";
import "../styles/home-page.css";
import "../styles/about-us.css";
import { MoralisProvider } from "react-moralis";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/37020/nft-charity/v0.0.1",
});

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </MoralisProvider>
    );
}

export default MyApp;
