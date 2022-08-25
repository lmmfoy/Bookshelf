const express = require("express");
const app = express();

app.get("/hi", (req, res) => {
        res.status(200).json({status: 200, message: "success"});
});

app.listen(8000, () => {
        console.log(`Server launched on port 8000`);
});
