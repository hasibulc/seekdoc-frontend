/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'bootstrap/dist/css/bootstrap.min.css';

import { element } from "prop-types";
import fetch from "isomorphic-fetch"

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  fetch
});

// const onServiceWorkerUpdateReady = () => window.location.reload();

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     {element}
//   </ApolloProvider>,
//   document.getElementById('root')
// );

export const wrapRootElement = ({element}) => (
    <ApolloProvider client={client}>
        {element}
    </ApolloProvider>
)