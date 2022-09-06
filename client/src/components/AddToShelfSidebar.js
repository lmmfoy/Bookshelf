import styled from "styled-components";

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

    const handleAddBookSubmit = (e) => {
        e.preventDefault();

        const chosenShelves = shelves.filter((shelf, index) => {
            return checkboxState[index] === true;
        });

        console.log(chosenShelves);

        chosenShelves.forEach((shelf) => {
            console.log(shelf);
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
                    json.data.modifiedCount === 0 &&
                        alert(
                            `This edition has already been added to "${shelf.name}", cannot add again.`
                        );
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
                {/* <legend>Add to shelf</legend> */}
                <div>
                    {shelves.map((shelf, index) => {
                        return (
                            <div className="button-div">
                                <div className="shelf-button">
                                    <input
                                        type="checkbox"
                                        id={`shelf-{shelf.name}`}
                                        name={`shelf-{shelf.name}`}
                                        value={shelf.name}
                                        checked={checkboxState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <div>
                                        <span> {shelf.name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button type="submit">Add to shelf</button>
            </fieldset>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    padding: 20px;
    background-color: var(--color-philippine-bronze);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);
    height: 100vh;
    /* margin: -50px -50px 0 0; */
    width: 350px;
    /* flex: 0 1 auto; */
    /* z-index: -1;
    padding-top: 50px; */
    /* position: absolute;
    margin: 160px 10px 0 0;
    right: 0;
    top: 0; */
    align-self: flex-end;
    position: absolute;
    margin: -50px -50px 0 0;
    

    h3 {
        font-size: 1.4em;
        margin: 20px 20px 20px 10px;
        color: var(--color-beige);
    }

    fieldset {
        display: flex;
        gap: 20px;

        legend {
            font-size: 1.3em;
            font-weight: 600;
            background-color: var(--color-saddle-brown);
            border-radius: 10px;
            padding: 10px;
        }

        .button-div {
            display: flex;
            flex-direction: column;
        }

        .shelf-button {
            position: relative;
            width: 180px;
            height: 70px;
            margin: 5px;
            /* float: left; */
            border: px solid var(--color-beige);
            box-sizing: border-box;
            border-radius: 10px;
            color: var(--color-beige);
            background-color: var(--color-burnt-orange);

            /*     --color-american-bronze: #3e1404;
        --color-philippine-bronze: #6a2b05;
        --color-saddle-brown: #964315;
        --color-brown-brown: #5e320f;
        --color-dark-red: #590909;
        --color-brick-red: #7b2018;
        --color-burnt-orange-brown: #8c4611;
        --color-burnt-orange: #9c461e;
        --color-maroon: #451b1b;
        --color-maroon-red: #680822;
        --color-beige: #FBF6EE; */

            &:hover {
                background-color: var(--color-burnt-orange);
                box-shadow: 0 0 5px 1px var(--color-beige);
            }

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

            input[type="checkbox"]:checked ~ div {
                background-color: var(--color-american-bronze);
                border-radius: 10px;
            }
        }

        button {
        }
    }
`;

export default AddToShelf;