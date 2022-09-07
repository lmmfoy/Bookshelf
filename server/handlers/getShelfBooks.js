"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const getShelf = async(req, res) => {

    try {
        await client.connect();
        const db = client.db("Users");

        const user = await db.collection("users").findOne({ email: email });

    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
}

module.exports = {
    getShelf,
};
