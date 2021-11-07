const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes');

const app = express();

app.set('trust proxy', 1);

// Middlewares
app.use(cors({
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
