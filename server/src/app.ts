import * as express from 'express';
import { createConnection, getRepository } from 'typeorm';
import * as bodyParser from 'body-parser';

import { Request, Response } from 'express';

import User from './entity/User';

const PORT = 3000;
const app = express();

createConnection()
  .then(async () => {
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.send('hello');
    });

    app.get('/users', async (req: Request, res: Response) => {
      const users = await getRepository(User).find();
      res.json(users);
    });

    app.listen(PORT, () => {
      // console.log(`Server listening on port ${PORT}`)
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
