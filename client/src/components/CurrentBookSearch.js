import { useState, createContext } from "react";

export const BookSearchContext = createContext(null);

export const BookSearchContextProvider = ({ children }) => {
    const [newBooks, setNewBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);

    return (
        <BookSearchContext.Provider
            value={{
                newBooks,
                setNewBooks,
                page,
                setPage,
                numPages,
                setNumPages,
            }}
        >
            {children}
        </BookSearchContext.Provider>
    );
};
