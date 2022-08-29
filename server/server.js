const {bookSearch} = require("./handlers/searchBooks") 

const express = require("express");
const app = express();

const {addUser} = require("./handlers/addUser")

app.use(express.json());

app.get("/search/:search_terms", bookSearch);


app.post("/user", addUser);


// app.get("*", (req, res) => {
//     res.status(404).json({
//         status: 404,
//         message: "This is obviously not what you are looking for.",
//     });
// });

app.listen(8000, () => {
    console.log(`Server launched on port 8000`);
});
