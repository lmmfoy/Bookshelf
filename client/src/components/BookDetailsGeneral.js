import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book
const GeneralBookDetails = ({ book }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    // The different editions of the work
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // Returns the editions of the work
    useEffect(() => {
        // Each work in the OpenLibrary API includes a list of edition keys to specific editions of the work
        // Map through these and fetch the specific editions
        book.edition_key.forEach((key) => {
            fetch(`/search/ol/${key}`)
                .then((res) => res.json())
                .then((data) => {
                    // Only return those that are in English or don't indicate which language they're in,
                    // are actually books, or don't indicate what format they are,
                    // have a publish year/date, have publisher and author data, and have an ISBN
                    // The object keys returned are quite uneven, hence the various conditionals
                    if (
                        (!data.data.languages ||
                            data.data.languages[0].key === "/languages/eng") &&
                        (!data.data.physical_format ||
                            data.data.physical_format.toLowerCase() ===
                                "paperback" ||
                            data.data.physical_format.toLowerCase() ===
                                "hardcover" ||
                            data.data.physical_format.toLowerCase() ===
                                "ebook") &&
                        (data.data.publish_year || data.data.publish_date) &&
                        data.data.publishers &&
                        data.data.authors &&
                        (data.data.isbn_13 || data.data.isbn_10)
                    ) {
                        // Add the edition to the options state
                        setOptions((prev) => [
                            ...prev,
                            {
                                value: data.data.key,
                                label: `${
                                    data.data.publish_year ||
                                    data.data.publish_date
                                }, ${data.data.publishers.join(", ")}`,
                                book: data.data,
                            },
                        ]);
                    }
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }, []);

    // When an edition is selected, the reader is navigated to that edition's page
    const onChange = (e) => {
        // There are different ISBN possibilities
        let isbn;
        if (e.book.isbn_13) {
            isbn = e.book.isbn_13[0];
        } else if (e.book.isbn_10) {
            isbn = e.book.isbn_10[0];
        } else if (e.book.isbn) {
            isbn = e.book.isbn[0];
        }

        isbn && navigate(`/book/${isbn}`);
    };

    return (
        <StyledBookPage>
            <div className="cover">
                {
                    // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                    book.cover_i ? (
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?`}
                            alt={`${book.title} book cover`}
                        />
                    ) : (
                        <img src="images/book-cover.png" alt="book cover" />
                    )
                }
            </div>
            <div className="book-details">
                <h2>{book.title}</h2>
                <p className="author">
                    {book.author_name && book.author_name.join(", ")}
                </p>
                <p className="date">
                    First published: {book.first_publish_year}
                </p>
                <div>
                    {/* https://github.com/JedWatson/react-select */}
                    <h3 className="select">Select edition:</h3>
                    <Select
                        defaultValue={selectedOption}
                        onChange={onChange}
                        options={options}
                        isSearchable={true}
                        autoFocus={true}
                        isLoading={isLoading}
                        className="select-dropdown"
                    />
                </div>
            </div>
        </StyledBookPage>
    );
};

const StyledBookPage = styled.div`
    margin: 0 100px;
    width: 100%;
    display: flex;
    gap: 50px;
    max-width: 1700px;

    .cover {
        flex: 1 1 auto;
    }
    img {
        border-radius: 10px;
        width: 500px;
        height: 750px;
    }

    .book-details {
        border: 2px solid var(--color-burnt-orange-brown);
        box-shadow: 10px 5px 10px 0 rgba(0, 0, 0, 0.2);
        font-size: 1.1em;
        padding: 20px;
        border-radius: 10px;
        line-height: 1.3em;
        flex: 2 1 auto;
        width: 100%;
        width: 700px;

        h2 {
            font-size: 2em;
            line-height: 1.2em;
            padding-bottom: 8px;
        }

        .author {
            font-size: 1.3em;
            padding: 10px 0 10px;
        }

        .date {
            font-size: 1.1em;
        }

        .select {
            padding: 40px 0 10px;
        }

        .select-dropdown {
            border: 1px solid;
        }

        input {
        }
        .css-6j8wv5-Input {
            background-color: var(--color-beige);
        }

        .css-319lph-ValueContainer {
            background-color: var(--color-beige);
        }

        .css-1s2u09g-control {
            border: none;
            outline: none;
        }

        .dZucby .book-details .css-1s2u09g-control {
            background-color: var(--color-beige);
        }

        .css-1hb7zxy-IndicatorsContainer {
            background-color: var(--color-beige);
        }
    }
`;

export default GeneralBookDetails;
