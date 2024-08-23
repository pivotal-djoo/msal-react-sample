import cors from 'cors';
import express, { Request, Response } from 'express';
import { expressjwt, Request as JWTRequest } from 'express-jwt';

import 'dotenv/config';
import { expressJwtConfig } from './auth';

if (process.env.NODE_ENV === 'e2e') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const app = express();
const port = 3000;

app.use(
  cors({
    origin: '*',
    methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT']
  })
);

app.get('/public-content', (req: Request, res: Response) => {
  res.send({
    message: 'Hello from backend api app!'
  });
});

app.get(
  '/user-only-content',
  expressjwt(expressJwtConfig),
  (req: JWTRequest, res: Response) => {
    if (!req.auth) {
      res.sendStatus(401);
      return;
    }

    const username = req.auth.preferred_username || req.auth.email;

    res.send({
      message: `Backend app validated auth token for user ${username}.`
    });
  }
);

app.get(
  '/roles',
  expressjwt(expressJwtConfig),
  (req: JWTRequest, res: Response) => {
    if (!req.auth) {
      res.sendStatus(401);
      return;
    }

    res.send({
      roles: req.auth.roles
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
