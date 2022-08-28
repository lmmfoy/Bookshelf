"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const addUser = async (req, res) => {
    try {
      await client.connect();
      const db = client.db();
  

  
      res.status(200).json({ status: 200, data: result });
    } catch (err) {
      res.status(404).json({ status: 404, data: err });
    }
  };