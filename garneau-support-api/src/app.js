"use strict";
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database/connection');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


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