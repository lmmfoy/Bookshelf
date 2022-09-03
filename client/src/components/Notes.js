import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

const Notes = ({ book }) => {
    const { shelves } = useContext(UserContext);

    const [note, setNote] = useState({
        date: "",
        title: "",
        noteText: "",
    });

    const date = new Date();
    const readableDate = date.toDateString();

    const handleChange = ((e) => {
        const value = e.target.value
        console.log(value)
        setNote({...note, [e.target.name]: value})
    })

    const handleSubmit = (() => {
        console.log(note)
    })

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

export default Notes;
