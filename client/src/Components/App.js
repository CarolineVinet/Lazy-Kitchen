import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Gate from "./GatePage";
import Homepage from "./Homepage";
import Profile from "./Profile";
import RecipePage from "./RecipePage";
import SignIn from "./SignInForm";
import Results from "./Results";
import FourOhFour from "./FourOhFour";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Gate />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/Homepage">
          <Homepage />
        </Route>
        <Route exact path="/results">
          <Results />
        </Route>
        <Route exact path="/results/:id">
          <RecipePage />
        </Route>
        <Route exact path="/profile/user/:id">
          <Profile />
        </Route>
        <Route exact path="/*">
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
