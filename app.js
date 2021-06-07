const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const usersRouter = require('./routes/users');
const characterRouter = require('./routes/characters')
require('dotenv').config()

var app = express();

/** ENV VARIABLES **/
const dbURL = process.env.DB_URL;
const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;

/**CONNECT TO DB */
const atlasURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbURL}`;
mongoose.connect(atlasURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
    console.log("Database connection established...");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/characters', characterRouter)


module.exports = app;
