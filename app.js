const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const indexRouter = require('./routes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on: ${PORT}`));
