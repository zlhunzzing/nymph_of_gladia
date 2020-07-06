import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
import App from "./App";
// import reducers from "./modules";
// import { store } from "./store"

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root"),
);
