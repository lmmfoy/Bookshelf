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
    const { email, shelf } = req.body;
    console.log(email, shelf);
    try {
        await client.connect();
        const db = client.db("Users");

        const added = await db
            .collection("users")
            .update({ email: email }, { $push: {shelves: shelf}});
        console.log(added);
        res.status(200).json({ status: 200, data: added });
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    updateShelf,
};
