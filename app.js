const express = require('express');

const { PORT = 3000 } = process.env;
const path = require('path');
const router = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT, () => { });
