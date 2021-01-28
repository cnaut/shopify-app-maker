import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import ClientRouter from '../components/ClientRouter';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '../styles/globals.css'

import '@shopify/polaris/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

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
          <link
            rel="stylesheet"
            href="https://unpkg.com/@shopify/polaris@5.13.1/dist/styles.css"
          />
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