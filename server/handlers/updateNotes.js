"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// Add a note to a book object in the user's object in the database
const addNote = async (req, res) => {
    const { note, email, key } = req.body;

    try {
        await client.connect();
        const db = client.db("Users");

        // Find user and create a newShelves array
        const user = await db.collection("users").findOne({ email: email });
        const newShelves = [];

        // Check each shelf to see if it has books, then check those to see if the current book is among them
        // If so, add the note (create the notes array if none yet added, else push the new note)
        // Save in newShelves
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

        // Update the shelves in the database to the new array, to include the new note
        await db
            .collection("users")
            .updateOne({ email: email }, { $set: { shelves: newShelves } });

        res.status(200).json({ status: 200, data: newShelves });
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    addNote,
};
