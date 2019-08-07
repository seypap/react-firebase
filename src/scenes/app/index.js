import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../startPage';
import MainPage from '../mainPage';
import NotFound from '../404';

import '../../styles/global.css';

import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/main" component={MainPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
