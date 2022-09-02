const request = require("request-promise");
const openLibrary = "https://openlibrary.org";

// Returns array of books which meet search criteria (title/author/both)
const bookSearch = async (req, res) => {
    const searchTerms = req.params.search_terms;

    try {
        const result = await request(`${openLibrary}/search.json?${searchTerms}`);
        const parsedResult = await JSON.parse(result);
        // The book objects returned have a lot of keys, just return some of these
        const bookInfo = parsedResult.docs.map((item) => {
            item.edition_key.map(key => {
                console.log(key)
            })
            const {
                key,
                title,
                first_publish_year,
                publish_year,
                publish_date,
                first_sentence,
                publisher,
                language,
                author_name,
                author_key,
                subject,
                isbn,
                cover_i,
                edition_count,
                edition_key,
            } = item;

            return {
                key,
                title,
                first_publish_year,
                publish_year,
                publish_date,
                first_sentence,
                publisher,
                language,
                author_name,
                author_key,
                subject,
                isbn,
                cover_i,
                edition_count,
                edition_key,
            };
        });
        // console.log(parsedResult)

        const bookObject = {bookInfo: bookInfo, numFound: parsedResult.num_found, start: parsedResult.start}
        res.status(200).json({ status: 200, data: bookObject});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
};

const singleBookSearchISBN = async(req, res) => {
    const isbn = req.params.isbn

    try {
        const result = await request(`${openLibrary}/isbn/${isbn}.json`);
        const parsedResult = await JSON.parse(result);

        res.status(200).json({ status: 200, data: parsedResult});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
}

const singleBookSearchOL = async(req, res) => {
    const ol_id = req.params.ol_id

    try {
        const result = await request(`${openLibrary}/books/${ol_id}.json`);
        const parsedResult = await JSON.parse(result);

        res.status(200).json({ status: 200, data: parsedResult});
    } catch (err) {
        res.status(404).json({ status: 404, data: err.message });
    }
}

module.exports = {
    bookSearch, singleBookSearchISBN, singleBookSearchOL
};
