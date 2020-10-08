import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../Login';
import SignUp from '../SignUp';
import CreateImage from '../CreateImage';
import Gallery from '../Gallery';
import ImageDetails from '../ImageDetails';

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
        <Route exact path="/Gallery">
          <Gallery />
        </Route>
        <Route exact path="/ImageDetails:id">
          <ImageDetails />
        </Route>
        <Route path="/">
          <h3>Page under construction (404)</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
