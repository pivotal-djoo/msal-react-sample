import reactLogo from './assets/react.svg';
import entraLogo from '/entra.svg';
import './App.css';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useMsalAuthentication
} from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { References } from './References';
import { loginRequest } from './msalConfig';

function App() {
  const { accounts, instance } = useMsal();
  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

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
