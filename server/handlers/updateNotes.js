"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const addNote = async (req, res) => {
    const { isbn, note } = req.body;
    console.log(isbn, note);

    try {
        await client.connect();
        const db = client.db("Users");
        //"shelves.$.books.$.isbn_13[0]":


        // const y = await db.collection("users").dropIndexes(res.status(400), true)

        //         const y = await db.collection("users").indexInformation()
        // console.log(y)

        // const x = await db.collection("users").createIndex({"isbn_10": "text"})
        // console.log(x)

        // const test = await db
        //     .collection("users")
        //     .find({
        //         $text:
        //         {
        //           $search: isbn,
        //         }
        //     });
        
        // await db.collection("users").dropIndexes();
        // const indexResult = await db.collection("users").createIndex({ isbn_10: 'text' });
        // console.log(indexResult)

        // const test = await db.collection("users").find().toArray()
        // await db.collection("users").deleteMany()
        // const result = await db.collection("users").insertMany(test)

        // const final = await db
        //     .collection("users")
        //     .find({
        //         $text:
        //         {
        //           $search: isbn,
        //         }
        //     }).toArray();

            console.log(final)
        res.status(200).json({ status: 200, data: final });
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    addNote,
};
