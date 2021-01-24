import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import ClientRouter from '../components/ClientRouter';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

import '@shopify/polaris/dist/styles.css';
class MyApp extends App {

  static async getInitialProps(server) {
    const shopOrigin = server.ctx.query.shop;
    return { shopOrigin };
  }

  render() {
    const { Component, pageProps } = this.props;
    const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
    console.log(this.props.router.route)
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        
        { this.props.router.route == "/builder" ? 
        (
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        ) : (
          <Provider config={config}>
            <ClientRouter />
            <AppProvider>
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </AppProvider>
          </Provider>
        )}


      </React.Fragment>
    );
  }
}

export default MyApp;