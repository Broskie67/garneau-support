"use strict";
const express = require('express');
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
const db = require('./database/connection');
const authRoute = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoute')
const adminRoute = require('./routes/adminRoute')
const ticketRoute = require('./routes/ticketRoute')
const commentRoute = require('./routes/commentRoute')
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(authRoute);
app.use(profileRoute);
app.use(adminRoute);
app.use(ticketRoute);
app.use(commentRoute);


(async () => {
  try {
    await db.authenticate();
      console.log('Database connection has been established successfully.');

      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;