const request = require("request-promise");
const openLibrary = "https://openlibrary.org/search.json?";

// Returns array of books which meet search criteria (title/author/both)
const bookSearch = async (req, res) => {
    const searchTerms = req.params.search_terms;
    console.log(searchTerms)

    try {
        const result = await request(`${openLibrary}${searchTerms}`);
        const parsedResult = await JSON.parse(result);

        // The book objects returned have a lot of keys, just return some of these
        const bookInfo = parsedResult.docs.map((item) => {
            const {
                key,
                title,
                first_publish_year,
                first_sentence,
                publisher,
                author_name,
                author_key,
                subject,
                isbn,
            } = item;

            return {
                key,
                title,
                first_publish_year,
                first_sentence,
                publisher,
                author_name,
                author_key,
                subject,
                isbn,
            };
        });

        res.status(200).json({ status: 200, data: bookInfo });
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
};

module.exports = {
    bookSearch,
};
