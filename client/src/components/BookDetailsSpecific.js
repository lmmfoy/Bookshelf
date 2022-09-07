import { useState } from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import NewNote from "./NoteNew";
import OldNotes from "./NotesOld";
import AddToShelf from "./AddToShelfSidebar";
import RingLoader from "react-spinners/RingLoader";

// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

const SpecificBookDetails = ({
    isbn,
    setIsbnNotRecognized
}) => {
    const [authors, setAuthors] = useState([]);
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    // Initialize state with array of falses
    const [checkboxState, setCheckboxState] = useState(
        new Array(shelves.length).fill(false)
    );
    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(true);


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
                            <div className="space-div">

                            </div>
                            <div className="old-notes">
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
    /* margin: 0 350px 100px auto; */
    
        
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
        max-width: 2095px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 50px;
        
        .column-1,
        .column-2,
        .column-3 {
            display: flex;
            flex-direction: column;
            
        }
        .column-1 {
            border: 1px solid;
            align-self: flex-start;
            flex: 1 1 auto;
            max-width: 550px;
            .cover {
                height: 50%;
                img {
                    max-height: 750px;
                    width: 100%;
                    flex: 1 1 auto;
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
            max-width: 900px;
            flex: 2 2 auto;
            margin: 0 50px;
            border: 1px solid;
            
            .book-details {
                width: 100%;
                font-size: 1.1em;
                height: 700px;
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

            .space-div {
                height: 0;
            }
            .old-notes {
                width: 100%;
                margin-top: 50px;
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