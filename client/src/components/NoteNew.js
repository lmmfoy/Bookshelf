import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import { EditText, EditTextarea } from "react-edit-text";

const NewNote = ({ book, isbn }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);

    const date = new Date();
    const readableDate = date.toDateString();

    const [note, setNote] = useState({
        date: readableDate,
        title: "",
        noteText: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setNote({ ...note, [e.target.name]: value });
    };

    // const onShelf = shelves.filter((shelf) => {
    //     if (!shelf.books) {
    //         return false;
    //     }
    //     return (
    //         shelf.books.filter((entry) => {
    //             return entry.key === book.key;
    //         }).length > 0
    //     );
    // });

    const handleSubmit = () => {
        const newShelves = [];

        // Check each shelf to see if it has books, then check those to see if the current book is among them
        // If so, add the note (create the notes array if none yet added, else push the new note)
        // Save in newShelves
        // shelves.forEach((shelf) => {
        //     shelf.books &&
        //         shelf.books.map((entry) => {
        //             if (entry.key === book.key) {
        //                 if (!entry.userNotes) {
        //                     entry.userNotes = [note];
        //                 } else {
        //                     entry.userNotes.push(note);
        //                 }
        //             }
        //             return entry;
        //         });
        //     newShelves.push(shelf);
        // });

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
                console.log(json);
                // Update shelves
                setShelves(json.data);
                // Empty new note values
                setNote({ date: readableDate, title: "", noteText: "" });
            });
    };

    console.log(shelves);

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
                />
            </div>

            {/* <div>
                    <EditText
                        name="notes"
                        rows={4}
                        style={{ paddingTop: 0 }}
                        placeholder="Enter notes"
                        value={note.noteText}
                        onChange={handleChange}
                        // onSave={() => {
                        //     console.log(note)
                        // }}
                    />
                </div> */}
            <button onClick={handleSubmit}>Enter</button>
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    flex: 1 1 auto;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);

    /* border: 2px solid var(--color-burnt-orange-brown); */
    border-radius: 10px;
    padding: 20px;
    min-width: 300px;
    max-width: 500px;
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

            /* transition: background 0.2s ease; */
            /* min-height: 30px; */

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
            /* transition: background 0.2s ease; */

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

    /* ._IYz6Z {
        display: flex;
    }

    ._NGZSv {
        background-color: #fff;
        color: black;
        border: 0;
        outline: none;
        min-width: 28px;
    }

    ._NGZSv:focus {
        border: 0;
        outline: none;
    } */
`;

export default NewNote;
