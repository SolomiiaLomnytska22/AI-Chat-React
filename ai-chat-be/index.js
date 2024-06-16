
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chat');
const loginRoutes = require('./routes/login');
const genAPIRoutes = require('./routes/genAPI');
const logoutRoutes =  require('./routes/logout');

const cookieParser = require("cookie-parser");
const verifyJWT = require('./middleware/verifyJWT')

const app = express();
app.use(cookieParser());
app.use(verifyJWT);
const cors = require("cors");
const corsOrigin = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  };
app.use(cors(corsOrigin));

app.use(express.json());
app.use(express.urlencoded());

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/chat', chatRoutes);
app.use('/gen', genAPIRoutes)
app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)


app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})