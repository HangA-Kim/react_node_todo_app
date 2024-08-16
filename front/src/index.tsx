import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID || "";

root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
