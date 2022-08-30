const request = require("request-promise");

const authorSearch = async(req, res) => {
    const author_id = req.params.author_id;

    try {
        const result = await request(`https://openlibrary.org/authors/${author_id}.json`);
        const parsedResult = await JSON.parse(result);
        console.log(parsedResult)

        res.status(200).json({ status: 200, data: parsedResult});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
}

module.exports = {
    authorSearch,
};