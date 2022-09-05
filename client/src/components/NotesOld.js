import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const OldNotes = ({ book }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [notes, setNotes] = useState([]);

    console.log(book);

    useEffect(() => {
        // Check each shelf for the current book. If found, return an array with the book object (filter out any 'undefined' results)
        let oldNotes = [];
        shelves.forEach((shelf) => {
            shelf.books &&
                shelf.books.forEach((entry) => {
                    if (entry.key === book.key) {
                        oldNotes = entry.userNotes;
                    }
                });
        });

        setNotes(oldNotes);
    }, [shelves]);

    console.log(notes);
    return (
        <StyledNotes>
            {notes &&
                notes.map((note) => {
                    return (
                        <div
                            className="note"
                            key={Math.floor(Math.random() * 14000000000)}
                        >
                            <h3>{note.date}</h3>
                            <h3>{note.title}</h3>
                            <p>{note.noteText}</p>
                        </div>
                    );
                })}
        </StyledNotes>
    );
};

const StyledNotes = styled.div`
    flex: 2 1 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;

    .note {
        border: 2px solid var(--color-burnt-orange-brown);
        border-radius: 10px;
        padding: 20px;
    }
`;

export default OldNotes;
