import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";

const OldNotes = ({ book }) => {
    const { shelves, setShelves, siteUser } = useContext(UserContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // const existingBooks = shelves.find((shelf) => shelf.books).books;
        // console.log(existingBooks);

        // let b;
        // if (existingBooks) {
        //    b = existingBooks.find((entry) => entry.key === book.key)
        // }
        // console.log(b.userNotes)
        // const test = shelves
        //     .find((shelf) => shelf.books)
        //     .books.find((entry) => entry.key === book.key).userNotes;
        // if (test) {
        //     setNotes(test);
        // }
    }, []);

    console.log(notes);
    return (
        <div>
            {notes &&
                notes.map((note) => {
                    return <div>{note.title}</div>;
                })}
        </div>
    );
};
export default OldNotes;
