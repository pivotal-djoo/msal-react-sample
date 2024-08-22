# MSAL.js + React Sample

This sample provides a minimal setup to get Authentication working using [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js#readme) with React and Vite.

## Getting Started

1. Create a `.env` file in `frontend` folder with the following content.

```bash
VITE_CLIENT_ID="replace-with-Client-ID-from-Entra-ID"
VITE_TENANT_ID="replace-with-Azure-Tenant-ID"
VITE_REDIRECT_URI="http://localhost:5173"
VITE_SCOPE="replace-with-scope-to-access-the-app"
VITE_API_URI="http://localhost:3000"
```

2. Create a `.env` file in `backend` folder with the following content.

```bash
CLIENT_ID="replace-with-Client-ID-from-Entra-ID"
TENANT_ID="replace-with-Azure-Tenant-ID"
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

## References

- https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react
- https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-javascript-sign-in
- https://vitejs.dev/guide/
