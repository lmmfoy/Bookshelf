import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const OldNotes = ({ book }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [notes, setNotes] = useState([]);


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
    /* flex: 1 1 auto; */
    display: flex;
    flex-direction: column;
    padding: 30px;
    /* height: 100%; */
    /* width: 100%; */
    overflow-y: scroll;
    scrollbar-color: var(--color-green) var(--color-burnt-orange-brown);
    scrollbar-width: thin;

    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;

    h3 {
        padding: 10px 30px;
        border-bottom: 2px solid var(--color-burnt-orange-brown);
        margin-bottom: 25px;
    }

    .note {
        /* border: 2px solid var(--color-burnt-orange-brown); */
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
