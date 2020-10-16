import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../Login';
import SignUp from '../SignUp';
import CreateImage from '../CreateImage';
import Gallery from '../Gallery';
import ImageDetails from '../ImageDetails';
import Header from '../Header';
import Collections from '../Collections';
import CollectionDetails from '../CollectionDetails';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/SignUp">
          <SignUp />
        </Route>

        <Route exact path="/CreateImage">
          <Header />
          <CreateImage />
        </Route>

        <Route exact path="/Gallery">
          <Header />
          <Gallery />
        </Route>

        <Route exact path="/ImageDetails:id">
          <ImageDetails />
        </Route>

        <Route exact path="/Collections">
          <Header />
          <Collections />
        </Route>

        <Route exact path="/ColletionDetails:collectionId">
          <Header />
          <CollectionDetails />
        </Route>

        <Route path="/">
          <h3>Page under construction (404)</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
