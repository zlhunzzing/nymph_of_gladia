import React from "react";
import { Switch, Route } from "react-router-dom";

/* pages */
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/main" render={() => <Main></Main>}></Route>
        <Route path="/" render={() => <Main></Main>}></Route>
      </Switch>
    </div>
  );
}

export default App;
