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

const API_URI = import.meta.env.VITE_API_URI;

function App() {
  const [idToken, setIdToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userContent, setUserContent] = useState('');
  const [userRoles, setUserRoles] = useState([]);
  const [eventCallbackId, setEventCallbackId] = useState<string | null>(null);
  const { instance } = useMsal();
  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  const getTokens = () => {
    return instance.acquireTokenSilent({
      scopes: loginRequest.scopes,
      account: instance.getActiveAccount() as AccountInfo | undefined
    });
  };

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const authenticationResult = event.payload as { account: AccountInfo };
        const account = authenticationResult.account;
        instance.setActiveAccount(account);
      }
      if (
        event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
      ) {
        getTokens().then((result) => {
          setIdToken(result.idToken);
          setAccessToken(result.accessToken);
        });
      }
    });
    setEventCallbackId(callbackId);
  }, []);

  const handleLogin = () => {
    setUserContent('');
    login(InteractionType.Redirect, loginRequest);
  };

  const handleLogout = () => {
    if (eventCallbackId) {
      instance.removeEventCallback(eventCallbackId);
    }

    const logoutRequest = {
      account: instance.getActiveAccount(),
      id_token_hint: idToken
    };
    instance.logoutRedirect(logoutRequest);
  };

  const getUserContent = async () => {
    const accessToken = (await getTokens()).idToken;
    const response = await fetch(`${API_URI}/user-only-content`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());
    setUserContent(response.message);
  };

  const getUserRoles = async () => {
    const accessToken = (await getTokens()).idToken;
    const response = await fetch(`${API_URI}/roles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());
    setUserRoles(response.roles);
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
              <p>Signed in as: {instance.getActiveAccount()?.username}</p>
              <p>Account ID: {instance.getActiveAccount()?.localAccountId}</p>
              <p>
                <button onClick={getUserContent}>Get user content</button>
                {userContent && <pre id="json">{userContent}</pre>}
              </p>
              <p>
                <button onClick={getUserRoles}>Get user roles</button>
                {userRoles.length > 0 && (
                  <pre id="json">{userRoles.join(', ')}</pre>
                )}
              </p>
              <button onClick={handleLogout}>Logout</button>

              <p>Token Claims: </p>
              <pre
                id="json"
                style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
              >
                {JSON.stringify(
                  instance.getActiveAccount()?.idTokenClaims,
                  null,
                  4
                )}
              </pre>

              <p>ID Token:</p>
              <pre
                id="json"
                style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
              >
                {idToken}
              </pre>
              <p>Access Token:</p>
              <pre
                id="json"
                style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
              >
                {accessToken}
              </pre>
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
