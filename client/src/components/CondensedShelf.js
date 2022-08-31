import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement(document.getElementById("root"));

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = () => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);

    let subtitle;

    const addShelf = () => {
        setModalOpen(true);
    };

    // const afterOpenModal = () => {
    //     subtitle.style.color = "#f00";
    // };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleNewShelfSubmit = (e) => {
        e.preventDefault();

        setShelves(prev => ({...prev, name: e.target.value[0], description: e.target.value[1]}))

        fetch("/user", {
            method: "PATCH",
            body: JSON.stringify({
                email: siteUser.email,
                shelves: shelves,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json.data)
        })
    };

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
                                    class="shelf-name"
                                    name="shelf-name"
                                />

                                <label for="description">Description:</label>
                                <textarea
                                    id="description"
                                    class="description"
                                    name="description"
                                    rows="4"
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

                .shelf-name, .description {
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
