const express = require('express');
const routerApi = require('./routes');
const { logError, errorHandler, boomErrorHandler } = require('./middlerwares/errorsHandler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('From EAG Store');
});

app.get('/new', (req, res) => {
  res.send('From EAG Store get new!');
});

routerApi(app);

//This order is the order that those will go to execute.
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("LISTEN ON ", port);
});
