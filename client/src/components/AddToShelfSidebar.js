import { useEffect } from "react";
import styled from "styled-components";

// This sidebar is a component on the SpecificBookPage. It allows users to add the book to their shelves.
const AddToShelf = ({
    shelves,
    checkboxState,
    setCheckboxState,
    siteUser,
    book,
}) => {
    // When a shelf button is clicked, this finds the item in state (using its index), toggles it true/false,
    // changes the checked state of the other buttons to false (only one can be selected at a time), then updates the state
    const handleOnChange = (position) => {
        const updatedState = checkboxState.map((item, index) => {
            if (index === position) {
                return !item;
            } else {
                return false;
            }
        });
        setCheckboxState(updatedState);
    };

    // useEffect(() => {
    //     shelves.forEach((shelf) => {
    //         if (shelf.books) {
    //             shelf.books.forEach((item) => {
    //                 if (item.key === book.key) {
    //                     console.log(shelf);
    //                 }
    //             });
    //         }
    //     });
    // }, []);

    // When "Add to Shelf" button clicked, book is added to indicated shelf
    const handleAddBookSubmit = (e) => {
        e.preventDefault();

        // Identifies the chosen shelf
        const chosenShelves = shelves.filter((shelf, index) => {
            return checkboxState[index] === true;
        });

        // Adds the book to the shelf unless it's already there
        chosenShelves.forEach((shelf) => {
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
                    // No modifiction made because book already on shelf
                    json.data.modifiedCount === 0 &&
                        alert(
                            `This edition has already been added to "${shelf.name}", cannot add again.`
                        );
                    // Modification to shelf made
                    json.data.modifiedCount === 1 &&
                        alert(
                            `This edition has successfully been added to "${shelf.name}"`
                        );
                });
        });

        // Uncheck the buttons
        setCheckboxState(
            checkboxState.map((item) => {
                return false;
            })
        );
    };

    return (
        <StyledForm onSubmit={handleAddBookSubmit}>
            <h3>Add to shelf</h3>
            <fieldset>
                <div className="flex-div">
                    {shelves.map((shelf, index) => {
                        let disabled = false;
                        // Disable input if book already on that shelf
                        if (shelf.books) {
                            shelf.books.forEach((item) => {
                                if (item.key === book.key) {
                                    console.log(shelf.name);
                                    disabled = true;
                                }
                            });
                        }
                        return (
                            <div className="button-div">
                                <div
                                    className={`shelf-button ${
                                        !disabled && "hoverable"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`shelf-{shelf.name}`}
                                        name={`shelf-{shelf.name}`}
                                        value={shelf.name}
                                        checked={checkboxState[index]}
                                        onChange={() => handleOnChange(index)}
                                        disabled={disabled}
                                    />
                                    <div>
                                        <span> {shelf.name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button type="submit" className="submit">
                    Add to shelf
                </button>
            </fieldset>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    padding: 20px 30px;
    background-color: var(--color-american-bronze);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);
    height: 100vh;
    align-self: flex-end;
    margin: -80px 0 0 0;
    position: sticky;
    top: 0;
    width: 100%;
    padding-right: 100px;

    h3 {
        font-size: 1.4em;
        margin: 20px 20px 20px 10px;
        color: var(--color-beige);
    }

    fieldset {
        display: flex;
        gap: 20px;
        width: 350px;

        .flex-div {
            flex: 1 1 auto;

            .button-div {
                display: flex;
                flex-direction: column;
                width: 100%;

                .shelf-button {
                    position: relative;
                    width: 100%;
                    min-width: 250px;
                    max-width: 350px;
                    height: 70px;
                    margin: 5px;
                    box-sizing: border-box;
                    border-radius: 10px;
                    color: var(--color-beige);
                    background-color: #7d3306;

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
                        width: 180px;
                        height: 60px;
                        opacity: 0;
                        cursor: pointer;
                    }

                    input[type="checkbox"]:disabled ~ div {
                        border-radius: 10px;
                        opacity: 30%;
                        background-color: #0c0500;
                    }

                    input[type="checkbox"]:checked ~ div {
                        /* background-color: var(--color-saddle-brown); */
                        border-radius: 10px;
                        border: 1px solid;
                    }
                }

                .hoverable:hover {
                    background-color: var(--color-burnt-orange);
                    box-shadow: 0 0 5px 1px var(--color-beige);
                }
            }
        }

        .submit {
            width: 100%;
            min-width: 100px;
            max-width: 150px;
            background-color: #7d3306;

            &:hover {
                box-shadow: 0 0 5px 1px var(--color-beige);
                background-color: var(--color-saddle-brown);
            }
        }
    }
`;

export default AddToShelf;
