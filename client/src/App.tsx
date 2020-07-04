import React from "react";
import { Switch, Route } from "react-router-dom";

/* pages */
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Singlemode from "./pages/Singlemode";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/main" render={() => <Main></Main>}></Route>
        <Route
          path="/singlemode"
          render={() => <Singlemode></Singlemode>}
        ></Route>
        <Route path="/signup" render={() => <Signup></Signup>}></Route>
        <Route path="/" render={() => <Main></Main>}></Route>
      </Switch>
    </div>
  );
}

export default App;
