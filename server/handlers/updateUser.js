"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

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

    added = await db
        .collection("users")
        .updateOne({ email: email }, { $set: { shelves: updatedShelf } });

    res.status(200).json({ status: 200, data: added });
};

const addShelf = async (db, email, shelf, res) => {
    const added = await db
        .collection("users")
        .updateOne({ email: email, "shelves.name": {$ne: shelf.name} }, {$addToSet: {  shelves: shelf } });

    res.status(200).json({ status: 200, data: added });
};

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
