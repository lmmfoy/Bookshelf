import { useState } from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import NewNote from "./NoteNew";
import OldNotes from "./NotesOld";
import AddToShelf from "./AddToShelf";
// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

const SpecificBookDetails = ({ isbn }) => {
    const [authors, setAuthors] = useState([]);
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    // Initialize state with array of falses
    const [checkboxState, setCheckboxState] = useState(
        new Array(shelves.length).fill(false)
    );
    const [book, setBook] = useState({});

    console.log(shelves);
    console.log(book);
    // This function fetches the result of the ISBN search, sets the information in state
    useEffect(() => {
        fetch(`/search/isbn/${isbn}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data.data);
                console.log(data.data);
            })

            // Authors are listed in an array of ids and must be fetched separately
            .then(() => {
                book.authors &&
                    book.authors.forEach((author) => {
                        // author.key takes the form "/authors/author_id"
                        fetch(`/search${author.key}`)
                            .then((res) => res.json())
                            .then((data) => {
                                setAuthors((prev) => [prev, data.data]);
                            });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <StyledBookPage>
            {
                // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                book.covers ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg?`}
                        alt={`${book.title} book cover`}
                    />
                ) : (
                    <img src="/images/book-cover.png" alt="book cover" />
                )
            }
            <div className="book-details">
                <h2>{book.title}</h2>
                <div>
                    {authors.map((author) => {
                        return <p>{author.name}</p>;
                        //author info - links, fuller_name, photos, birth_date, death_date, alternate_names, bio, wikipedia
                    })}
                </div>
                <p>
                    Published: {book.publish_date},{" "}
                    {book.publish_places && (
                        <span>{book.publish_places.join(", ")}, </span>
                    )}{" "}
                    {book.publishers && book.publishers.join(", ")}
                </p>
                <p>ISBN: {isbn}</p>
                <p>
                    {(book.pagination || book.number_of_pages) && (
                        <span>
                            Pages: {book.pagination || book.number_of_pages}
                        </span>
                    )}
                </p>
                <p>{book.notes && book.notes}</p>
                <AddToShelf
                    shelves={shelves}
                    checkboxState={checkboxState}
                    setCheckboxState={setCheckboxState}
                    siteUser={siteUser}
                    book={book}
                />
                {/* identifiers for different places: {book.identifiers} */}
            </div>
            <OldNotes book={book} />
            <NewNote book={book} isbn={isbn} />
        </StyledBookPage>
    );
};

const StyledBookPage = styled.div`
    display: flex;

    form {
        fieldset {
            border: 1px solid;
            padding: 10px;

            .shelf-button {
                position: relative;
                width: 120px;
                height: 50px;
                margin: 5px;
                /* float: left; */
                border: 2px solid green;
                box-sizing: border-box;

                div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    line-height: 25px;
                    transition: 0.5s ease;
                }

                /* Make the actual checkboxes invisible in order to have checkbox buttons */
                input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 120px;
                    height: 45px;
                    opacity: 0;
                    cursor: pointer;
                }

                input[type="checkbox"]:checked ~ div {
                    background-color: pink;
                }
            }
            input[type="submit"] {
                margin: 20px;
            }
        }
    }
`;

export default SpecificBookDetails;
