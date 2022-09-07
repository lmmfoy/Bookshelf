import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import { EditText, EditTextarea } from "react-edit-text";

// Appears on SpecificBookPage, gives user ability to keep notes about books they have on their shelves
const NewNote = ({ book, isbn }) => {
    const { setShelves, siteUser } = useContext(UserContext);

    // Get current date to add to new note
    const date = new Date();
    const readableDate = date.toDateString();

    // Keep track of new note
    const [note, setNote] = useState({
        date: readableDate,
        title: "",
        noteText: "",
    });

    // As note entered, add it to note state
    const handleChange = (e) => {
        const value = e.target.value;
        setNote({ ...note, [e.target.name]: value });
    };

    // When note submitted, add to user's entry in database
    const handleSubmit = () => {
        // Send request to backend to update the shelves
        fetch("/user/books", {
            method: "PATCH",
            body: JSON.stringify({
                email: siteUser.email,
                isbn: isbn,
                note: note,
                key: book.key,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.data === 0) {
                    alert("Book must be added to a shelf first");
                } else {
                    // Update shelves in state
                    setShelves(json.data);
                    // Empty new note values
                    setNote({ date: readableDate, title: "", noteText: "" });
                }
            });
    };

    return (
        <StyledNotes>
            <div className="date">
                <strong>
                    <label for="date">Date: </label>
                </strong>
                <EditText
                    name="date"
                    type="date"
                    className="text"
                    defaultValue={readableDate}
                    inline
                    readonly
                />
            </div>
            <div className="section">
                <EditText
                    name="title"
                    className="title text"
                    rows={4}
                    style={{ paddingTop: 0 }}
                    placeholder="Enter a title"
                    value={note.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="section">
                <EditTextarea
                    name="noteText"
                    className="noteText text"
                    rows={4}
                    style={{ paddingTop: 0 }}
                    placeholder="Enter notes"
                    value={note.noteText}
                    onChange={handleChange}
                    required
                />
            </div>
            <button onClick={handleSubmit}>Enter</button>
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    flex: 1 1 auto;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);
        background-color: #f7d7d4;

    border-radius: 10px;
    padding: 20px;
    min-width: 300px;
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    gap: 10px;

    .date {
        padding: 0 0 10px 5px;
    }

    .section {
        border: 1px solid #aaa;
        border-radius: 10px;

        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
                cursor: pointer;
                background: rgba(220, 220, 220, 0.4);
            }
        }

        textarea {
            border: none;
            outline: none;
            background-color: transparent;
            resize: none;
            min-height: 200px;
            width: 100%;
        }

        .noteText {
            overflow-y: auto;
            min-height: 200px;

            &:hover {
                cursor: pointer;
                background: rgba(220, 220, 220, 0.4);
            }

            &:focus {
            }
        }

        .text {
            width: 100%;
            padding: 10px;
            display: block;
            margin: 3px 0;
            scrollbar-width: thin;
            outline: none;

            input {
                padding: 10px;
                line-height: 1.5em;
                font-size: 1.2em;
                border: none;
                outline: none;
                border-style: hidden;
            }
        }
    }

    input[type="text"]:focus,
    textarea:focus {
        padding: 10px;
        font-size: 1.2em;
        border: none;
        outline: none;
        border-radius: 10px;
    }

    ._TDklp {
        color: #999;
    }

    ._gmkRL {
        display: inline !important;
    }

    ._-wzeg {
        cursor: auto !important;
    }

    ._-wzeg:hover {
        cursor: auto !important;
    }
`;

export default NewNote;
