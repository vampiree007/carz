import React from 'react';
import ReactDOM from 'react-dom';

// Gql imports
import { ApolloProvider } from '@apollo/client';
import {split} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

// From apollo boost
import {InMemoryCache} from 'apollo-boost';
import {HttpLink} from 'apollo-boost';
import { ApolloClient } from '@apollo/client';

// React Imports
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store'

// 1 creating websocket link
const wsLink = process.browser ? new WebSocketLink({
  uri: 'ws://localhost:8000/graphql',
  options: {
    reconnect: true,
    timeout: 4000
  }
}) : null
// 2 create http link
const httpLink = new HttpLink({
  uri: '/graphql'
})
// 3 set up authorization
const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
    }
  }
});

// 4 Merge authLink with HttpLink to secure routes
const httpAuthLink = authLink.concat(httpLink);

// use split to split hhtp link or websocket link
const link = process.browser ? split(({query})=>{
  const definition = getMainDefinition(query);
  return(definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
}, wsLink, httpAuthLink): httpAuthLink


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <Provider store={store} >
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
