import { useEffect, useContext, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import styled from "styled-components";

import NewNote from "./NoteNew";
import OldNotes from "./NotesOld";
import AddToShelf from "./AddToShelfSidebar";

import { UserContext } from "./UserContext";

// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book
const SpecificBookDetails = ({ isbn, setIsbnNotRecognized }) => {
    const { shelves, siteUser } = useContext(UserContext);

    // Keep track of authors and the book
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    // Initialize state with array of falses - this is to keep track which shelf button is clicked
    const [checkboxState, setCheckboxState] = useState(
        new Array(shelves.length).fill(false)
    );

    // This function fetches the result of the ISBN search, sets the information in state
    useEffect(() => {
        fetch(`/search/isbn/${isbn}`)
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.data === "string") {
                    setIsbnNotRecognized(true);
                } else {
                    setBook(data.data);
                    return data.data.authors;
                }
            })

            // Authors are listed in an array of ids and must be fetched separately
            .then((data) => {
                data &&
                    data.forEach((author) => {
                        // author.key takes the form "/authors/author_id"
                        fetch(`/search${author.key}`)
                            .then((res) => res.json())
                            .then((data) => {
                                setAuthors((prev) => [prev, data.data]);
                            });
                    });
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <StyledBookPage>
            {/* Shows loading animation until book information loaded */}
            {isLoading ? (
                <div className="loading-div">
                    <RingLoader
                        loading={isLoading}
                        className="loader"
                        color={"var(--color-burnt-orange-brown)"}
                        size={150}
                    />
                </div>
            ) : (
                <div className="book-wrapper">
                    <div className="background-div"></div>
                    <div className="column-0"></div>
                    <div className="column-1">
                        <div className="cover-div">
                            {
                                // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                                book.covers ? (
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg?`}
                                        alt={`${book.title} book cover`}
                                    />
                                ) : (
                                    <img
                                        src="/images/book-cover.png"
                                        alt="book cover"
                                        className="generic-cover"
                                    />
                                )
                            }
                        </div>

                        <div className="new-notes">
                            <NewNote book={book} isbn={isbn} />
                        </div>
                    </div>

                    <div className="column-2">
                        <div className="book-details">
                            <h2>{book.title}</h2>
                            <div className="author">
                                {/* Display all author names */}
                                {authors.map((author) => {
                                    return (
                                        <p
                                            key={Math.floor(
                                                Math.random() * 14000000000
                                            )}
                                        >
                                            {author.name}
                                        </p>
                                    );
                                })}
                            </div>
                            <p>
                                {book.publish_date && (
                                    <span>
                                        Published: {book.publish_date},{" "}
                                    </span>
                                )}
                                {book.publish_places && (
                                    <span>
                                        {book.publish_places.join(", ")},{" "}
                                    </span>
                                )}{" "}
                                {book.publishers && book.publishers.join(", ")}
                            </p>
                            <p>ISBN: {isbn}</p>
                            <p>
                                {(book.pagination || book.number_of_pages) && (
                                    <span>
                                        Pages:{" "}
                                        {book.pagination ||
                                            book.number_of_pages}
                                    </span>
                                )}
                            </p>
                            <div className="space-div"></div>
                        </div>
                            <div className="old-notes">
                                <div>
                                    {!isLoading && <OldNotes book={book} />}
                                </div>
                            </div>
                    </div>

                    <div className="column-3">
                        <AddToShelf
                            shelves={shelves}
                            checkboxState={checkboxState}
                            setCheckboxState={setCheckboxState}
                            siteUser={siteUser}
                            book={book}
                        />
                    </div>
                </div>
            )}
        </StyledBookPage>
    );
};

const StyledBookPage = styled.div`
    height: 100%;

    .loading-div {
        height: 60vh;
        display: flex;
        align-items: center;

        .loader {
            display: block;
            margin: 0 auto;
        }
    }
    .book-wrapper {
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 50px;

        .background-div {
            position: absolute;
            top: 24%;
            width: 70%;
            height: 450px;
            background-color: #f7d7d4;
            z-index: -1;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
                0 6px 10px 0 rgba(0, 0, 0, 0.19);
            border-radius: 0 10px 10px 0;
        }

        .column-0,
        .column-1,
        .column-2,
        .column-3 {
            display: flex;
            flex-direction: column;
        }

        .column-0 {
            width: 60px;
            position: sticky;
            top: 0;
            margin: -50px 0 0 0;
            flex: 1 2 auto;
        }

        .column-1 {
            align-self: flex-start;
            flex: 1 1 auto;
            gap: 35px;


            .cover-div {

                img {
                    width: 100%;
                    flex: 1 1 auto;
                    border-radius: 10px;
                    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
                        0 6px 10px 0 rgba(0, 0, 0, 0.19);
                }

                .generic-cover {
                    box-shadow: none;
                }
            }

            .new-notes {
                width: 100%;
                /* margin-top: 50px; */
            }
        }
        .column-2 {
            /* max-width: 900px; */
            /* width: 100%; */
            flex: 1 1 auto;
            margin: 0 50px;
            gap: 20px;

            .book-details {
                width: 80%;
                font-size: 1.1em;
                min-height: 450px;
                border-radius: 10px;
                line-height: 1.3em;

                h2 {
                    font-size: 2em;
                    line-height: 1.2em;
                    padding-bottom: 8px;
                }
                .author {
                    font-size: 1.3em;
                    padding: 10px 0 30px;
                }
            }

            /* .space-div {
                height: 270px;
                flex: 1 1 auto;
                border: 1px solid;
            } */

            .old-notes {
                width: 100%;
                height: 60%;
                margin-bottom: 50px;

                div {
                    height: 100%;
                }
            }
        }
        .column-3 {
            flex: 1 1 auto;
            max-width: 500px;
            min-height: 100%;
        }
    }
`;

export default SpecificBookDetails;
