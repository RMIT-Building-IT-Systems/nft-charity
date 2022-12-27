import "../styles/globals.css";
import "../styles/app.css";
import "../styles/home-page.css";
import "../styles/about-us.css";
import { MoralisProvider } from "react-moralis";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    );
}

export default MyApp;
