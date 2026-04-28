"use strict";
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database/connection');
const authRoute = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoute')
const adminRoute = require('./routes/adminRoute')
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/admin", adminRoute);

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