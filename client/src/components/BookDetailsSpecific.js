import { useState } from "react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

const SpecificBookDetails = ({ book, isbn }) => {
    const [authors, setAuthors] = useState([]);
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    // Initialize state with array of falses
    const [checkboxState, setCheckboxState] = useState(
        new Array(shelves.length).fill(false)
    );

    console.log(shelves);
    useEffect(() => {
        book.authors.forEach((author) => {
            // author.key takes the form "/authors/author_id"
            fetch(`/search${author.key}`)
                .then((res) => res.json())
                .then((data) => {
                    setAuthors((prev) => [prev, data.data]);
                });
        });
    }, []);

    const handleAddBookSubmit = (e) => {
        e.preventDefault();

        const chosenShelves = shelves.filter((shelf, index) => {
            return checkboxState[index] === true;
        });

        console.log(chosenShelves);

        chosenShelves.forEach((shelf) => {
            console.log(shelf)
            fetch("/user/shelves", {
                method: "PATCH",
                body: JSON.stringify({
                    email: siteUser.email,
                    shelf: {
                        name: shelf.name,
                        books: book,
                    },
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json.data);
                });
        });
    };

    // When a shelf button is clicked, this finds the item in state (using its index) and toggles it true/false, then updates the state
    const handleOnChange = (position) => {
        const updatedState = checkboxState.map((item, index) => {
            return index === position ? !item : item;
        });
        setCheckboxState(updatedState);
    };

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
                    <img src="images/book-cover.png" alt="book cover" />
                )
            }
            <div className="book-details">
                <p>{book.title}</p>
                <div>
                    {authors.map((author) => {
                        return <p>{author.name}</p>;
                        /* author info - links, fuller_name, photos, birth_date, death_date, alternate_names, bio, wikipedia */
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
                    {(book.pagination || book.number_of_pages) && <span>Pages: {book.pagination || book.number_of_pages}</span>}
                </p>
                <p>{book.notes}</p>
                <form onSubmit={handleAddBookSubmit}>
                    <fieldset>
                        <legend>Add to shelf</legend>
                        {shelves.map((shelf, index) => {
                            return (
                                <div>
                                    <div className="shelf-button">
                                        <input
                                            type="checkbox"
                                            id={`shelf-{shelf.name}`}
                                            name={`shelf-{shelf.name}`}
                                            value={shelf.name}
                                            checked={checkboxState[index]}
                                            onChange={() =>
                                                handleOnChange(index)
                                            }
                                        />
                                        <div>
                                            <span> {shelf.name}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <input type="submit" value="Add to shelf" />
                    </fieldset>
                </form>
                {/* identifiers for different places: {book.identifiers} */}
            </div>
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
