import { useState } from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import NewNote from "./NoteNew";
import OldNotes from "./NotesOld";
import AddToShelf from "./AddToShelfSidebar";
// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

const SpecificBookDetails = ({ isbn, setIsbnNotRecognized }) => {
    const [authors, setAuthors] = useState([]);
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);
    // Initialize state with array of falses
    const [checkboxState, setCheckboxState] = useState(
        new Array(shelves.length).fill(false)
    );
    const [book, setBook] = useState({});

    // This function fetches the result of the ISBN search, sets the information in state
    useEffect(() => {
        fetch(`/search/isbn/${isbn}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.data.book) {
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
                                console.log(data.data);
                                setAuthors((prev) => [prev, data.data]);
                            });
                    });
            })
            .then(() => {
                setIsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(authors);
    return (
        <StyledBookPage>
            <div className="book-wrapper">
                <div className="column-1">
                    <div className="cover">
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
                                //author info - links, fuller_name, photos,  alternate_names, bio, wikipedia
                            })}
                        </div>
                        <p>
                            {book.publish_date && (
                                <span>Published: {book.publish_date}, </span>
                            )}
                            {book.publish_places && (
                                <span>{book.publish_places.join(", ")}, </span>
                            )}{" "}
                            {book.publishers && book.publishers.join(", ")}
                        </p>
                        <p>ISBN: {isbn}</p>
                        <p>
                            {(book.pagination || book.number_of_pages) && (
                                <span>
                                    Pages:{" "}
                                    {book.pagination || book.number_of_pages}
                                </span>
                            )}
                        </p>
                        {/* identifiers for different places: {book.identifiers} */}
                        <div className="old-notes">
                            {isLoaded && <OldNotes book={book} />}
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
        </StyledBookPage>
    );
};

const StyledBookPage = styled.div`
    /* margin: 0 350px 100px auto; */
    /* max-width: 1700px; */
    width: 100%;

    .book-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 50px;

        .column-1,
        .column-2,
        .column-3 {
            display: flex;
            flex-direction: column;
        }

        .column-1 {
            align-self: flex-start;
            width: 30%;
            flex: 1 1 auto;
            max-width: 550px;

            .cover {
                height: 50%;

                img {
                    max-height: 750px;
                    width: 100%;
                    flex: 1 1 auto;
                    /* border: 2px solid var(--color-burnt-orange-brown); */
                    border-radius: 10px;
                }
            }

            .new-notes {
                /* min-width: 300px;
                max-width: 500px; */
                width: 100%;
                margin-top: 50px;
            }
        }

        .column-2 {
            width: 30%;
            flex: 1 1 auto;
            margin: 0 80px;

            .book-details {
                width: 100%;

                font-size: 1.1em;
                /* border: 2px solid var(--color-burnt-orange-brown); */
                /* padding: 20px; */
                border-radius: 10px;
                /* margin-bottom: auto; */
                line-height: 1.3em;
                /* flex: 2 1 auto; */
                /* max-width: 500px; */
                /* box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
                    0 6px 10px 0 rgba(0, 0, 0, 0.19); */

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

            .old-notes {
                width: 100%;
                margin-top: 50px;
            }
        }

        .column-3 {
            width: 350px;
            align-self: stretch;
            justify-content: stretch;
        }
    }
`;

export default SpecificBookDetails;
