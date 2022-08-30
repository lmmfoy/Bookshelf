"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const updateShelf = async (req, res) => {
    const {email, shelf} = req.body;

    

    try {
        await client.connect();
        const db = client.db("Users");

        const priorUser = await (await db.collection("users").findOne({email}))


    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};
