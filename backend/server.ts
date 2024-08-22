import cors from 'cors';
import express, { Request, Response } from 'express';
import { expressjwt, Request as JWTRequest } from 'express-jwt';

import 'dotenv/config';
import { expressJwtConfig } from './auth';

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

    res.send({
      message: `Backend app validated auth token for user ${req.auth.unique_name}.`
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
