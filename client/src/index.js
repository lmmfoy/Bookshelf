import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain="dev-cq-a6k-9.us.auth0.com"
        clientId="1rP8o2guroF4kP2wdmcZ9YW4zAPkJBCS"
        redirectUri="http://localhost:3000"
    >
        <App />
    </Auth0Provider>
    // document.getElementById("root")
);
