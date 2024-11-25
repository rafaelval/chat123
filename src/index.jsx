import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-lnoda07jj1wqfmje.us.auth0.com"
    clientId="4wifbuxHy3orTGX8qAA93KHuDJ3E52z8"
    redirectUri="http://localhost:3000/chat"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
