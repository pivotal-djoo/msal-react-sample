import 'dotenv/config';
import jwksClient from 'jwks-rsa';
import { Algorithm, Jwt } from 'jsonwebtoken';
import { Request } from 'express';

const CLIENT_ID =
  process.env.NODE_ENV === 'e2e'
    ? process.env.E2E_CLIENT_ID
    : process.env.CLIENT_ID;
const OPENID_CONF_URI =
  process.env.NODE_ENV === 'e2e'
    ? `${process.env.E2E_AUTHORITY}/.well-known/openid-configuration`
    : `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`;

const getJwksURI = async () => {
  try {
    const response = await fetch(OPENID_CONF_URI);
    return (await response?.json()).jwks_uri;
  } catch (e) {
    console.error('Failed to resolve Jwks URI', e);
  }
};

const getSecret = async (req: Request, token: Jwt | undefined) => {
  const jwksUri = await getJwksURI();
  const client = jwksClient({ jwksUri });

  if (token?.header.kid) {
    try {
      const key = await client.getSigningKey(token.header.kid);
      return key.getPublicKey();
    } catch (e) {
      console.error('Failed to retrieve secret', e);
    }
  }
};

export const expressJwtConfig = {
  algorithms: ['RS256' as Algorithm],
  audience: CLIENT_ID,
  credentialsRequired: false,
  secret: getSecret
};
