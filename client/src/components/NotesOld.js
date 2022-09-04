import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";

const OldNotes = ({ book }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [notes, setNotes] = useState([]);

    console.log(book);
    useEffect(() => {
        // Check each shelf for the current book. If found, return an array with the book object (filter out any 'undefined' results)
        const onShelf = shelves
            .map((shelf) => shelf.books.find((entry) => entry.key === book.key))
            .filter((book) => book);

        console.log(onShelf);

        // If the book exists (array is more than 0), set the notes state with the saved old userNotes
        if (onShelf.length > 0) {
            const oldNotes = onShelf[0].userNotes;
            console.log(oldNotes);
            oldNotes && setNotes(oldNotes);
        }
    }, [shelves]);

    console.log(notes);
    return (
        <div>
            {notes &&
                notes.map((note) => {
                    return (
                        <div key={Math.floor(Math.random() * 14000000000)}>
                            <h3>{note.date}</h3>
                            <h3>{note.title}</h3>
                            <p>{note.noteText}</p>
                        </div>
                    );
                })}
        </div>
    );
};
export default OldNotes;
