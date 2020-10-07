import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../Login';
import SignUp from '../SignUp';
import CreateImage from '../CreateImage';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/CreateImage">
          <CreateImage />
        </Route>
        <Route exact path="/SignUp">
          <SignUp />
        </Route>
        {/* <Route exact path='/SignUp/SignUpAdress'>
          <SignUpAdress />
        </Route>
        <Route exact path='/loggedIn/FeedPage'>
          <FeedPage />
        </Route>
        <Route exact path='/loggedIn/SearchPage'>
          <SearchPage />
        </Route>  */}
        <Route path="/">
          <h3>Page under construction (404)</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
