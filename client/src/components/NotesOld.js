import { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "./UserContext";

// Shows user notes on the SpecificBookPage
const OldNotes = ({ book }) => {
    const { shelves } = useContext(UserContext);
    // Keeps track of user notes
    const [notes, setNotes] = useState([]);

    // Check each shelf for the current book. If found, return an array with the book object (filter out any 'undefined' results)
    useEffect(() => {
        let oldNotes = [];
        shelves.forEach((shelf) => {
            shelf.books &&
                shelf.books.forEach((entry) => {
                    // If there are userNotes included in the book object, add them to state
                    if (entry.key === book.key) {
                        oldNotes = entry.userNotes;
                    }
                });
        });
        setNotes(oldNotes);
    }, [shelves]);

    return (
        <StyledNotes>
            <h3>My Notes</h3>
            {notes &&
                notes.map((note) => {
                    return (
                        <div
                            className="note"
                            key={Math.floor(Math.random() * 14000000000)}
                        >
                            <h4>{note.title}</h4>
                            <p className="date">{note.date}</p>
                            <p>{note.noteText}</p>
                            <hr />
                        </div>
                    );
                })}
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    overflow-y: scroll;
    scrollbar-color: var(--color-green) var(--color-burnt-orange-brown);
    scrollbar-width: thin;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-color: #f7d7d4;
    width: 600px;

    h3 {
        padding: 10px 30px;
        border-bottom: 2px solid var(--color-burnt-orange-brown);
        margin-bottom: 25px;
    }

    .note {
        padding: 10px 30px;
        overflow-wrap: break-word;

        h4 {
            font-size: 1.1em;
            padding-bottom: 10px;
        }

        .date {
            padding-bottom: 20px;
        }

        hr {
            margin-top: 30px;
            width: 80%;
            opacity: 40%;
        }
    }
`;

export default OldNotes;
