import express from 'express';
const app = express();
const port = 3000;

import router from './routes.js';

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
