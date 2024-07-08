# MSAL.js + React Sample

This sample provides a minimal setup to get Authentication working using [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js#readme) with React and Vite.

## Getting Started

1. Replace the `CLIENT_ID` and `TENANT_ID` values in [msalConfig.ts](./src/msalConfig.ts)

```js
const CLIENT_ID = 'replace-with-Client-ID-from-Entra-ID';
const TENANT_ID = 'replace-with-Azure-Tenant-ID';
```

2. Install dependencies

```bash
pnpm install
```

3. Run the sample app locally

```bash
pnpm run dev
```

## References

- https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react
- https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-single-page-app-javascript-sign-in
- https://vitejs.dev/guide/
