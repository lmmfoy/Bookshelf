const request = require("request-promise");
const openLibrary = "https://openlibrary.org/search.json?";

// Returns array of books which meet search criteria (title/author/both)
const bookSearch = async (req, res) => {
    const searchTerms = req.params.search_terms;

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
                cover_i,
                edition_count,
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
                cover_i,
                edition_count,
            };
        });
        console.log(parsedResult)

        const bookObject = {bookInfo: bookInfo, numFound: parsedResult.num_found, start: parsedResult.start}
        res.status(200).json({ status: 200, data: bookObject});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
};

const singleBookSearch = async(res, req) => {
    const searchTerms = req.params.search_terms;

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
                cover_i,
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
                cover_i,
            };
        });
        console.log(parsedResult)

        const bookObject = {bookInfo: bookInfo, numFound: parsedResult.num_found, start: parsedResult.start}
        console.log(bookObject)
        res.status(200).json({ status: 200, data: bookObject});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
}

module.exports = {
    bookSearch, singleBookSearch,
};
