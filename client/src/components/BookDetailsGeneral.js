import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book
const GeneralBookDetails = ({ book }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [editions, setEditions] = useState([]);
    const [options, setOptions] = useState([]);
    const [sortedOptions, setSortedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

   
    useEffect(() => {
        book.edition_key.forEach((key) => {
            fetch(`/search/ol/${key}`)
                .then((res) => res.json())
                .then((data) => {
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
                        setEditions((prev) => [...prev, data.data]);
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
                {/* <p>{book.contributions && book.contributions.join(", ")}</p> */}
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
                        // filterOption={}
                    />
                </div>

                {/* publisher: {book.publisher} */}
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
    }
`;

export default GeneralBookDetails;
