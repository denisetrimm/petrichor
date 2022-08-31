import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/UserContext";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-i24bg52o.us.auth0.com"
      clientId="3UexjoTrv5e072MDLPJbCBRZ8mmNFi0B"
      redirectUri={window.location.origin}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
