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
const wsLink = new WebSocketLink({
  uri: 'wss://carrz.herokuapp.com/graphql',
  options: {
    reconnect: true,
    timeout: 40000
  }
});
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
const link = split(({query})=>{
  const definition = getMainDefinition(query);
  return(definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
}, wsLink, httpAuthLink);


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
