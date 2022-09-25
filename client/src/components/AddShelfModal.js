import Modal from "react-modal";
import styled from "styled-components";
import { useRef, useEffect } from "react";

Modal.setAppElement(document.getElementById("root"));

// This modal is used to add a new shelf
const AddShelfModal = ({
    handleNewShelfSubmit,
    handleChange,
    newShelf,
    modalOpen,
    closeModal,
}) => {
    const titleInput = useRef(null);

    // useEffect(() => {
    //     if (titleInput.current) {
    //         titleInput.current.focus();
    //     }
    // }, []);
    

    document.addEventListener(
        "focusin",
        function () {
            console.log("focused: ", document.activeElement);
        },
        true
    );

    return (
        <Modal
            isOpen={modalOpen}
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
                    <h2>Add a new bookshelf</h2>
                    <p>
                        Add a shelf name (for example, "To Read" or "Favourite
                        Mysteries") and a description.
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
                                ref={titleInput}
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
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

const ModalStyle = styled.div`
    min-height: 18rem;
    margin: 2rem;
    padding: 20px;
    background-color: var(--color-beige);
    border-radius: 0.25rem;

    .close-btn {
        border-radius: 100%;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-bottom: -20px;
        box-shadow: none;
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
                    font-size: 1.1em;
                }

                .shelf-name {
                    margin-bottom: 10px;
                    line-height: 1.3em;
                }

                button {
                    width: 100%;
                    height: 60px;
                    font-weight: 600;
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
export default AddShelfModal;
