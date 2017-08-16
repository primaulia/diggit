import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'rebass'

import Dashboard from './Dashboard'
import Topic from './Topic'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/topics/:id" component={Topic}/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
