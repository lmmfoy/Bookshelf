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

        // Check to see whether user is new
        const priorUser = await (await db.collection("users").findOne({_id}))
        
        if (priorUser) {
            res.status(200).json({ status: 200, data: priorUser });
        } else {
            const inserted = await db.collection("users").insertOne({ _id: _id, email: email })
            res.status(200).json({ status: 200, data: inserted });
        }
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    addUser,
};
