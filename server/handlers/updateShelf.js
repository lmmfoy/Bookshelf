"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// This function adds a book to one of the user's bookshelves if it is not already added (it is called below in the updateShelf function)
const addBook = async (db, email, shelf, res) => {
    const user = await db.collection("users").findOne({ email: email });

    let added;

    // Map through the user's shelves to find the correct one to add the book to
    // if no books are added yet, set up the shelf with its first book
    // otherwise, filter the books to make sure the new book isn't already on the shelf
    // If the length of the filtered list is 0, then push the new book to the shelf
    const updatedShelf = user.shelves.map((item) => {
        item.name === shelf.name &&
            (item.books
                ? item.books.filter((book) => {
                      return book.key === shelf.books.key;
                  }).length === 0 && item.books.push(shelf.books)
                : (item.books = [shelf.books]));
        return item;
    });

    // Update the shelf to the updated shelf value. If no change was made to the shelf
    // (i.e. if the book was already on the shelf and updatedShelf didn't actually change)
    // the data sent to the frontend will include "modifiedCount: 0" (if modified, will include "modifiedCount: 1")
    added = await db
        .collection("users")
        .updateOne({ email: email }, { $set: { shelves: updatedShelf } });

    res.status(200).json({ status: 200, data: added });
};


// Add a new shelf to the database if it doesn't already exist
// If it already exists, the response will be sent with "modifiedCount: 0"
// This function is called in updateShelf
const addShelf = async (db, email, shelf, res) => {
    const added = await db
        .collection("users")
        .updateOne(
            { email: email, "shelves.name": { $ne: shelf.name } },
            { $addToSet: { shelves: shelf } }
        );

    res.status(200).json({ status: 200, data: added });
};


// This function checks whether the user is trying to add a book to a shelf or add a new shelf, then calls the appropriate function
const updateShelf = async (req, res) => {
    const { email, shelf } = req.body;

    try {
        await client.connect();
        const db = client.db("Users");

        if (shelf.books) {
            addBook(db, email, shelf, res);
        } else {
            addShelf(db, email, shelf, res);
        }
    } catch (err) {
        res.status(400).json({ status: 400, data: err.message });
    }
};

module.exports = {
    updateShelf,
};
