const request = require("request-promise");
const openLibrary = "https://openlibrary.org/search.json?";

const bookSearch = async (req, res) => {
    const searchTerms = req.params.search_terms;
    console.log(searchTerms);
    console.log(`${openLibrary}${searchTerms}`)
    try {
        const result = await request(`${openLibrary}${searchTerms}`);
        const parsedResult = await JSON.parse(result);
        const bookInfo = parsedResult.docs.map((item) => {
            const {
                key,
                title,
                first_publish_year,
                first_sentence,
                publisher,
                author_name,
                author_key,
                person,
                subject,
            } = item;
            return {
                key,
                title,
                first_publish_year,
                first_sentence,
                publisher,
                author_name,
                author_key,
                person,
                subject,
            };
        });
        console.log(bookInfo)
        res.status(200).json({ status: 200, data: bookInfo });
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
};

module.exports = {
    bookSearch,
};
