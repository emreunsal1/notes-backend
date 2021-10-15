const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use(indexRouter);

app.listen(3000);
