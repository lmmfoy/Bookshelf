const { bookSearch, singleBookSearch } = require("./handlers/searchBooks");
const { addUser } = require("./handlers/addUser");
const { authorSearch } = require("./handlers/searchAuthors");
const { updateShelf } = require("./handlers/updateUser");

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/search/:search_terms", bookSearch); // Find all books that relate to search terms (author and/or title)
app.get("/search/isbn/:isbn", singleBookSearch); // Find specific book based on ISBN
app.get("/search/authors/:author_id", authorSearch); // Find author information based on author id

app.post("/user", addUser); // Add new user to MongoDB database
app.patch("/user/shelves", updateShelf); // Add, update shelves
// app.get("/user", getUserInformation); // Get user information including bookshelves, friends

// app.get("*", (req, res) => {
//     res.status(404).json({
//         status: 404,
//         message: "This is obviously not what you are looking for.",
//     });
// });

app.listen(8000, () => {
    console.log(`Server launched on port 8000`);
});
