"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// Add new user to database
const addUser = async (req, res) => {
    const {_id, email} = req.body;
    console.log(_id, email)

    try {
        await client.connect();
        const db = client.db("Users");

        const inserted = await db.collection("users").insertOne({ _id: _id, email: email })

        res.status(200).json({ status: 200, data: inserted });
    } catch (err) {
        res.status(404).json({ status: 404, data: err });
    }
};

module.exports = {
    addUser,
};
