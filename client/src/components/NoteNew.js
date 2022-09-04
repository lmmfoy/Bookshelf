import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

const NewNote = ({ book, isbn }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    console.log(shelves);

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
            {/* <div >
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>add notes</h3>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="date"
                            value={readableDate}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={note.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <textarea
                            id="noteText"
                            name="noteText"
                            placeholder="Your note"
                            // value={note.noteText}
                            rows="4"
                            value={note.noteText}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button>Enter</button>
                    </div>
                </form>
            </div> */}

            <div>
                <div>
                    <strong>
                        <label className="mr-2">Date: </label>
                    </strong>

                    <EditText
                        name="date"
                        type="date"
                        defaultValue={readableDate}
                        inline
                        readonly
                    />
                </div>

                <div>
                    <EditText
                        name="title"
                        rows={4}
                        style={{ paddingTop: 0 }}
                        placeholder="Enter a title"
                        value={note.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <EditTextarea
                        name="noteText"
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
            </div>
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    border: 1px solid;
    width: 400px;
`;

export default NewNote;
