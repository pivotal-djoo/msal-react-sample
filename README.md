# MSAL.js + React Sample

This sample provides a minimal setup to get Authentication working using [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js#readme) with React and Vite.

For running [E2E tests](./e2e/tests/example.spec.ts) written in Playwright, [Keycloak](https://www.keycloak.org/) is used to provide OIDC compatible authentication.

## Getting Started

> This project uses pnpm. Install via `npm install pnpm -g`

1. Create a `.env` file in `frontend` folder with the following content.

```bash
VITE_CLIENT_ID="replace-with-Client-ID-from-Entra-ID"
VITE_TENANT_ID="replace-with-Azure-Tenant-ID"
VITE_SCOPE="replace-with-scope-to-access-the-app"
VITE_E2E_CLIENT_ID="test-client-id"
VITE_E2E_AUTHORITY="https://localhost:8443/realms/test"
VITE_REDIRECT_URI="http://localhost:5173"
VITE_API_URI="http://localhost:3000"
```

2. Create a `.env` file in `backend` folder with the following content.

```bash
CLIENT_ID="replace-with-Client-ID-from-Entra-ID"
TENANT_ID="replace-with-Azure-Tenant-ID"
E2E_CLIENT_ID="test-client-id"
E2E_AUTHORITY="https://localhost:8443/realms/test"
```

3. Install frontend dependencies

```bash
cd frontend
pnpm install
```

4. Run the frontend app locally

```bash
pnpm run dev
```

5. Install backend dependencies

```bash
cd backend
pnpm install
```

6. Run the backend app locally

```bash
pnpm run dev
```

7. View the app in a browser: http://localhost:5173

## Run E2E tests locally

1. Create a `.env` file in `e2e` folder with the following content.

```bash
WEB_URL="http://localhost:5173"
USERNAME="test@example.com"
PASSWORD="password"
```

2. Start up Keycloak from provided [docker-compose.yaml](./docker-compose.yaml)

```bash
docker compose up -d
```

> Keycloak import file [test-realm.json](./keycloak/test-realm.json) provides a test user matching the above `.env` file content.

3. Start frontend and backend apps in e2e mode

```bash
cd frontend
pnpm install
pnpm run e2e

cd ../backend
pnpm install
pnpm run e2e
```

4. Install e2e tests dependencies

```bash
cd e2e
pnpm install
npx playwright install
```

5. Run the e2e test suite

```bash
npx playwright test
```

or run tests in a single browser in headed mode

```bash
npx playwright test --headed --project chromium
```

6. View test report

```bash
npx playwright show-report
```

## Updating Keycloak apps and users

See [How to Update Keycloak Realm JSON file](./keycloak/README.md) section.

## References

- https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react
- https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-javascript-sign-in
- https://vitejs.dev/guide/
