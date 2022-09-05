import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import BookTileSpecific from "./BookTileSpecific";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = () => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [newShelf, setNewShelf] = useState({ name: "", description: "" });

    console.log(shelves)
    let subtitle;

    // Causes 'Add Shelf' modal to appear
    const addShelf = () => {
        setModalOpen(true);
    };

    // const afterOpenModal = () => {
    //     subtitle.style.color = "#f00";
    // };

    // Causes 'Add Shelf' modal close
    const closeModal = () => {
        setModalOpen(false);
    };

    // When form on modal submitted, add the new shelf to the shelves state, then update database
    const handleNewShelfSubmit = (e) => {
        e.preventDefault();

        // Add new shelf to database
        fetch("/user/shelves", {
            method: "PATCH",
            body: JSON.stringify({
                email: siteUser.email,
                shelf: {
                    name: newShelf.name,
                    description: newShelf.description,
                },
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.data.modifiedCount === 1) {
                    setShelves((prev) => [
                        ...prev,
                        {
                            name: newShelf.name,
                            description: newShelf.description,
                        },
                    ]);
                    closeModal();
                } else {
                    alert("You already have a shelf with this name!");
                }
            });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setNewShelf({ ...newShelf, [e.target.name]: value });
    };

    return (
        <StyledShelf>
            <h2>My Shelves</h2>
            <Tabs
                className="tabs-outer"
                defaultFocus={true}
                selectedTabClassName="selected-tab"
            >
                {shelves.length > 0 ? (
                    <>
                        <div className="tab-list-container">
                            <TabList className="tab-list">
                                {shelves.map((shelf) => {
                                    return (
                                        <Tab
                                            key={Math.floor(
                                                Math.random() * 14000000000
                                            )}
                                            className="tab"
                                        >
                                            {shelf.name}
                                        </Tab>
                                    );
                                })}
                                <Tab className="tab" onClick={addShelf}>
                                    + Add shelf
                                </Tab>
                            </TabList>
                        </div>
                        <>
                            {shelves.map((shelf) => {
                                return (
                                    <>
                                        <TabPanel
                                            className="tab-panel"
                                            key={Math.floor(
                                                Math.random() * 14000000000
                                            )}
                                        >
                                            <h3>{shelf.name}</h3>
                                            <h4>{shelf.description}</h4>
                                            <div className="book-tiles">
                                                {shelf.books &&
                                                    shelf.books.map((book) => {
                                                        return (
                                                            <BookTileSpecific
                                                                key={book.key}
                                                                book={book}
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </TabPanel>
                                    </>
                                );
                            })}
                            {/* Empty tab panel because react-tabs doesn't like having tabs without tab panels, and there is an extra tab due to the "Add shelf" button */}
                            <TabPanel />
                        </>
                    </>
                ) : (
                    <>
                        <div className="tab-list-container">
                            <TabList className="tab-list">
                                <Tab className="tab" onClick={addShelf}>
                                    + Add shelf
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanel />
                    </>
                )}
            </Tabs>
            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Add shelf"
                // Adding style to the modal
                className="_"
                overlayClassName="_"
                contentElement={(props, children) => (
                    <ModalStyle {...props}>{children}</ModalStyle>
                )}
                overlayElement={(props, contentElement) => (
                    <OverlayStyle {...props}>{contentElement}</OverlayStyle>
                )}
            >
                <div>
                    <button className="close-btn" onClick={closeModal}>
                        x
                    </button>
                    <div className="modal-body">
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                            Add a new bookshelf
                        </h2>
                        <p>
                            Add a shelf name (for example, "To Read" or
                            "Favourite Mysteries") and a description.
                        </p>
                        <form onSubmit={handleNewShelfSubmit}>
                            <div>
                                <label for="shelf-name">Shelf name:</label>
                                <input
                                    type="text"
                                    id="shelf-name"
                                    className="shelf-name"
                                    name="name"
                                    value={newShelf.name}
                                    onChange={handleChange}
                                    required
                                />

                                <label for="description">Description:</label>
                                <textarea
                                    id="description"
                                    className="description"
                                    name="description"
                                    value={newShelf.description}
                                    rows="4"
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Add shelf</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </StyledShelf>
    );
};

const StyledShelf = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 30px 30px 30px;

    h2 {
        font-size: 2em;
        padding: 0 10px;
        margin-bottom: 20px;
    }

    h3,
    h4 {
        margin: 0 50px;
    }

    h3 {
        padding: 20px 0 10px;
    }

    h4 {
        padding-top: 10px;
        font-weight: 500;
    }

    .tabs-outer {
        display: flex;


        border-radius: 5px;
    }

    .tab-list-container {
        width: 99px;
        /* background-color: var(--color-beige); */
        border-right: 1px solid #aaa;
    }

    .tab-list {
        /* border-bottom: 1px solid #aaa; */
        margin: 0;
        padding: 0;
        height: 100%;
    }
    /* .tab:first-child {
        border-top: none;
    } */

    .tab {
        cursor: pointer;
        padding: 20px 10px;
        /* box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.09); */
        border-radius: 10px;
        /* background-color: var(--color-brick-red); */
        border: 1px solid transparent;
        /* border-right: 1px solid #aaa; */
        /* background-color: var(--color-beige); */


        &:hover {
            color: var(--color-burnt-orange);
        }

        &:focus {
            color: var(--color-maroon-red);
            outline: none;
        }
    }

    .tab-panel {
        display: none;
        display: flex;
        flex-direction: column;
        border-top: 1px solid #aaa;
        border-right: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        border-radius: 0 10px 10px 0;

        &:focus {
            display: block;
            width: 100%;

        }
    }

    .selected-tab {
        background-color: #fff;
        border-color: #aaa;
        border-right: 1px solid transparent;
        color: black;
        border-radius: 10px 0 0 10px;
        width: 100px;
    }

    .book-tiles {
        /* width: 100%; */
        border: 1px solid;
        display: flex;
        flex-wrap: wrap;
        margin: 30px 50px;
        gap: 1px;
    }
`;

const ModalStyle = styled.div`
    min-height: 18rem;
    margin: 2rem;
    padding: 20px;
    background-color: white;
    border-radius: 0.25rem;
    /* display: flex;
    flex-direction: column;
    gap: 20px; */

    .close-btn {
        border-radius: 100%;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-bottom: -20px;
        background-color: light-grey;
    }

    .modal-body {
        margin: 40px;

        h2 {
            font-size: 1.2em;
            margin-bottom: 15px;
        }

        p {
            margin-bottom: 25px;
        }

        form {
            display: flex;
            gap: 50px;
            align-items: flex-end;

            div {
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 100%;

                label {
                    margin-bottom: -5px;
                }

                .shelf-name,
                .description {
                    width: 100%;
                }

                .shelf-name {
                    margin-bottom: 10px;
                }
            }

            button {
                width: 100%;
                height: 60px;
                font-weight: 600;

                &:hover {
                    background-color: pink;
                }
            }
        }
    }
`;

const OverlayStyle = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: #212b3277;
`;

export default CondensedShelf;
