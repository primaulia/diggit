import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { Provider } from 'rebass'

import Dashboard from './Dashboard'
import Topic from './Topic'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider>
          <Router>
            <Switch>
              <Route exact path="/:id" component={Dashboard}/>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/topics/:id" component={Topic}/>
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App;
