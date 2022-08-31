import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement(document.getElementById("root"));

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = () => {
    const { shelves, setShelves } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);

    let subtitle;

    const addShelf = () => {
        setModalOpen(true);
    };

    // const afterOpenModal = () => {
    //     subtitle.style.color = '#f00';
    // }

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleNewShelfSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <StyledShelf>
            <h2 class="shelves">My Shelves</h2>
            <Tabs className="tabs-outer">
                {shelves.length > 0 ? (
                    <>
                        <TabList className="tab-list">
                            <Tab className="tab">Title 1</Tab>
                            <Tab className="tab">Title 2</Tab>
                        </TabList>

                        <TabPanel className="tab-panel">
                            <h2>content</h2>
                        </TabPanel>
                        <TabPanel className="tab-panel">
                            <h2>content2</h2>
                        </TabPanel>
                    </>
                ) : (
                    <>
                        <TabList className="tab-list">
                            <Tab className="tab" onClick={addShelf}>
                                + Add shelf
                            </Tab>
                        </TabList>

                        <TabPanel className="tab-panel">
                            <h2>content</h2>
                        </TabPanel>
                    </>
                )}
            </Tabs>
            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Add shelf"
            >
                <div className="add-modal">
                    <button className="close-btn" onClick={closeModal}>
                        x
                    </button>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Add a new bookshelf
                    </h2>
                    <div>
                        Add a shelf name (for example, "To Read" or "Favourite
                        Mysteries") and a description.
                    </div>
                    <form onSubmit={handleNewShelfSubmit}>
                        <label for="shelf-name">
                            Shelf name:
                            <input
                                type="text"
                                id="shelf-name"
                                name="shelf-name"
                            />
                        </label>
                        <label for="description">
                            Description:
                            <input
                                type="text"
                                id="description"
                                name="description"
                            />
                        </label>
                        <button type="submit">Add shelf</button>
                    </form>
                </div>
            </Modal>
        </StyledShelf>
    );
};

const StyledShelf = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid black;

    .shelves {
        font-size: 2em;
        padding: 10px;
        margin-bottom: 20px;
    }

    .tabs-outer {
        display: flex;
    }

    .tab-list {
        padding: 10px;
    }

    .tab {
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid black;

        &:hover {
            color: purple;
        }

        &:focus {
            color: green;
        }

        /* not sure if the below necessary */
        .tab-panel {
            display: none;

            &:focus {
                display: block;
            }
        }
    }

    .add-modal {
        .close-btn{
            background-color: blue;
        } 
        form {
            display: flex;
            flex-direction: column;
        }
    }
`;

export default CondensedShelf;
