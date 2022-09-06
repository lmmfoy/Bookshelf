import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import BookTileSpecific from "./BookTileSpecific";
import AddShelfModal from "./AddShelfModal";
import RingLoader from "react-spinners/RingLoader";

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = ({ isLoading }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [newShelf, setNewShelf] = useState({ name: "", description: "" });

    // Causes 'Add Shelf' modal to appear
    const addShelf = () => {
        setModalOpen(true);
    };

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
        <>
            {isLoading ? (
                <div className="loading-div">
                    {/* <RingLoader
                        loading={isLoading}
                        className="loader"
                        color={"var(--color-burnt-orange-brown)"}
                        size={100}
                    /> */}
                </div>
            ) : (
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
                                                        Math.random() *
                                                            14000000000
                                                    )}
                                                    className="tab"
                                                >
                                                    {shelf.name}
                                                </Tab>
                                            );
                                        })}
                                        <Tab
                                            className="tab add-new"
                                            onClick={addShelf}
                                            disabled={true}
                                        >
                                            Add shelf
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
                                                        Math.random() *
                                                            14000000000
                                                    )}
                                                >
                                                    <h3>{shelf.name}</h3>
                                                    <h4>{shelf.description}</h4>
                                                    <div className="book-tiles">
                                                        {shelf.books &&
                                                            shelf.books.map(
                                                                (book) => {
                                                                    return (
                                                                        <BookTileSpecific
                                                                            key={
                                                                                book.key
                                                                            }
                                                                            book={
                                                                                book
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
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
                                        <Tab
                                            className="tab"
                                            onClick={addShelf}
                                            disabled={true}
                                        >
                                            Add shelf
                                        </Tab>
                                    </TabList>
                                </div>
                                <TabPanel />
                            </>
                        )}
                    </Tabs>
                    <AddShelfModal
                        handleNewShelfSubmit={handleNewShelfSubmit}
                        handleChange={handleChange}
                        addShelf={addShelf}
                        newShelf={newShelf}
                        modalOpen={modalOpen}
                        closeModal={closeModal}
                    />
                </StyledShelf>
            )}
        </>
    );
};

const StyledShelf = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 30px 30px 30px;

    .loading-div {
        width: 100%;
        height: 100%;        
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;

        .loader {
            display: block;
            align-self: center;
        }
    }

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
        width: 100%;
        border-radius: 5px;
        border: 2px solid var(--color-burnt-orange-brown);
        box-shadow: 10px 5px 10px 0 rgba(0, 0, 0, 0.2);
    }

    .tab-list-container {
        width: 100px;
        background-color: white;
        border-right: 2px solid var(--color-burnt-orange-brown);
        margin: -2px 0 -2px -3px;

        .tab-list {
            /* border-bottom: 1px solid #aaa; */
            margin: 0;
            padding: 0;
            height: 100%;
        }
    }

    .tab {
        cursor: pointer;
        padding: 20px 10px;
        height: 100px;
        display: flex;
        align-items: center;
        padding: 0 5px 0 10px;
        box-shadow: -1px 1px 0px 1px rgba(0, 0, 0, 0.09);
        border-radius: 10px 0 0 10px;
        /* background-color: var(--color-beige); */
        background-color: #eee4e4;
        border-top: 1px solid #d6cbcb;
        border-bottom: 1px solid #d6cbcb;
        border-left: 1px solid #d6cbcb;
        font-size: 1.1em;
        /* border-right: 1px solid #aaa; */

        &:hover {
            color: var(--color-burnt-orange);
        }

        &:focus {
            color: var(--color-maroon-red);
            outline: none;
        }
    }

    .add-new {
        font-weight: 600;
        color: white;
        background-color: #9c461e;

        &:hover {
            color: white;
            transform: scale(1.04);
            transition: 0.25s ease-in-out;
        }
    }

    /* .tab:first-child {
        border-top: none;
    } */

    .tab-panel {
        display: none;
        display: flex;
        flex-direction: column;

        &:focus {
            display: block;
            width: 100%;
            flex-grow: 1 1 auto;
        }
    }

    .selected-tab {
        background-color: #fff;
        border: 2px solid var(--color-burnt-orange-brown);
        border-right: 2px solid transparent;
        color: black;
        border-radius: 10px 0 0 10px;
        margin-right: -2px;
    }

    .book-tiles {
        /* width: 100%; */
        display: flex;
        flex-wrap: wrap;
        margin: 30px 50px;
        gap: 40px;
    }
`;

export default CondensedShelf;
