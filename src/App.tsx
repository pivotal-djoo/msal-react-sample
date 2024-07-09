import reactLogo from './assets/react.svg';
import entraLogo from '/entra.svg';
import './App.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useMsalAuthentication
} from '@azure/msal-react';
import { AccountInfo, EventType, InteractionType } from '@azure/msal-browser';
import { References } from './References';
import { loginRequest } from './msalConfig';
import { useEffect, useState } from 'react';

function App() {
  const [idToken, setIdToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const { accounts, instance } = useMsal();
  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  instance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const authenticationResult = event.payload as { account: AccountInfo };
      const account = authenticationResult.account;
      instance.setActiveAccount(account);
    }
  });

  useEffect(() => {
    if (accounts[0]) {
      instance
        .acquireTokenSilent({
          scopes: loginRequest.scopes,
          account: instance.getActiveAccount() as AccountInfo | undefined
        })
        .then((result) => {
          console.log('##### acquire token result: ', result);
          setIdToken(JSON.stringify(result.idToken));
          setAccessToken(JSON.stringify(result.accessToken));
        });
    }
  }, [accounts, instance]);

  const handleLogin = () => {
    login(InteractionType.Redirect, loginRequest);
  };

  const handleLogout = () => {
    const logoutRequest = {
      account: instance.getAccountByHomeId(accounts[0]?.homeAccountId)
    };
    instance.logoutRedirect(logoutRequest);
  };

  return (
    <>
      <div>
        <img src={entraLogo} className="logo" alt="Entra logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>MSAL.js + React Sample</h1>
      <AuthenticatedTemplate>
        <div className="card">
          {error ? (
            <p>Error occurred: {error.errorMessage}</p>
          ) : (
            <>
              <p>Signed in as: {accounts[0]?.username}</p>
              <p>Account ID: {accounts[0]?.localAccountId}</p>
              <p>ID Token: {idToken}</p>
              <p>Access Token: {accessToken}</p>

              <p>Token Claims: </p>
              <pre
                id="json"
                style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
              >
                {JSON.stringify(accounts[0]?.idTokenClaims, null, 4)}
              </pre>

              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="card">
          <button onClick={handleLogin}>Login</button>
        </div>
      </UnauthenticatedTemplate>
      <References />
    </>
  );
}

export default App;
