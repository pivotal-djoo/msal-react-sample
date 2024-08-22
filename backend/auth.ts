import 'dotenv/config';
import jwksClient from 'jwks-rsa';
import { Algorithm, Jwt } from 'jsonwebtoken';
import { Request } from 'express';

const getJwksURI = async () => {
  let url;

  try {
    const result = await fetch(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`
    );
    url = (await result?.json())?.jwks_uri;
  } catch (error) {
    console.error('Failed to resolve Jwks URI');
  }
  return url;
};

const getSecret = async (req: Request, token: Jwt | undefined) => {
  const client = jwksClient({
    jwksUri: await getJwksURI()
  });

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
  audience: process.env.CLIENT_ID,
  credentialsRequired: false,
  secret: getSecret
};
