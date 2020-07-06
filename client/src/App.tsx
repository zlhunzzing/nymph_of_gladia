import React from "react";
import { Switch, Route } from "react-router-dom";

/* pages */
import Main from "./pages/Main";
// import Signup from "./pages/Signup";
import SelectCharacter from "./pages/SelectCharacter";
import Battle from "./pages/Battle";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/main" render={() => <Main></Main>}></Route>
        <Route
          path="/selectCharacter"
          render={() => <SelectCharacter></SelectCharacter>}
        ></Route>
        <Route path="/battle" render={() => <Battle></Battle>}></Route>
        {/* <Route path="/signup" render={() => <Signup></Signup>}></Route> */}
        <Route path="/" render={() => <Main></Main>}></Route>
      </Switch>
    </div>
  );
}

export default App;
