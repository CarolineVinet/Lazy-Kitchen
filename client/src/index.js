import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import CurrentUserProvider from "./Components/CurrentUserContext";
import BasicResultsProvider from "./Components/BasicResultsContext";
import * as serviceWorker from "./serviceWorker";
import LazyContextProvider from "./Components/LazyContext";
import ReviewsProvider from "./Components/ReviewsContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <BasicResultsProvider>
        <LazyContextProvider>
          <ReviewsProvider>
            <App />
          </ReviewsProvider>
        </LazyContextProvider>
      </BasicResultsProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
