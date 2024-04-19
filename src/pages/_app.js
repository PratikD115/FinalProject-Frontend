import "@/src/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Player from "@/components/footer/Player";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/store";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  let display = true;
  let routePath = router.pathname;

  if (routePath === "/login" || routePath === "/signup") {
    display = false;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        {display && <Player />}
      </ApolloProvider>
    </Provider>
  );
}
