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
    const { isbn, note, email, onShelf, key } = req.body;
    console.log(isbn, note, email, onShelf, key);

    try {
        await client.connect();
        const db = client.db("Users");

        const user = await db.collection("users").findOne({ email: email });
        // const updatedShelf = user.shelves.map((shelf) => {

        // if (!shelf.books) {
        //     return shelf;
        // }
        // return shelf.books.map((entry) => {
        //     if (entry.key === key) {
        //         if (!entry.notes) {
        //             entry.userNotes = [note];
        //         } else {
        //             entry.userNotes.push(note);
        //          }
        //     }
        //     return entry;
        // });
        // });

        const newShelves = [];

        user.shelves.forEach((shelf) => {
            shelf.books &&
                shelf.books.map((entry) => {
                    if (entry.key === key) {
                        if (!entry.userNotes) {
                            entry.userNotes = [note];
                        } else {
                            entry.userNotes.push(note);
                        }
                    }
                    return entry;
                });
            newShelves.push(shelf);
        });
        console.log(newShelves);

        const added = await db
            .collection("users")
            .updateOne({ email: email }, { $set: { shelves: newShelves } });

        res.status(200).json({ status: 200, data: added });
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    addNote,
};
