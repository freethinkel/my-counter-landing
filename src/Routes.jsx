import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import App from './App';
import Partners from './HOC/Partners';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/partners" component={Partners} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};
