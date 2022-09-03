const AddToShelf = ({ shelves, checkboxState, setCheckboxState, siteUser, book }) => {
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
        <form onSubmit={handleAddBookSubmit}>
            <fieldset>
                <legend>Add to shelf</legend>
                <div>
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
                <input type="submit" value="Add to shelf" />
            </fieldset>
        </form>
    );
};

export default AddToShelf;
