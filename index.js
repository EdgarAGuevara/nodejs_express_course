const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { logError, errorHandler, boomErrorHandler } = require('./middlerwares/errorsHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'performance-centec.';
const REGION_ID = 'uk';

app.use(express.json());
// app.use(cors);// in this way we can accept every domain.
// const whitelist = ['http://localhost', 'https://myapp.co',`https://${PROJECT_ID}.${REGION_ID}.r.appspot.com`]; //for example
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('No permitido'));
//     }
//   }
// }
// app.use(cors(options));

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

app.listen(PORT, () => {
  console.log("LISTEN ON ", PORT);
});
