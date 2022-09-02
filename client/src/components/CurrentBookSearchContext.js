import { useState, createContext } from "react";

export const BookSearchContext = createContext(null);

export const BookSearchContextProvider = ({ children }) => {
    const [newBooks, setNewBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [searchTerms, setSearchTerms] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <BookSearchContext.Provider
            value={{
                newBooks,
                setNewBooks,
                page,
                setPage,
                numPages,
                setNumPages,
                searchTerms,
                setSearchTerms,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </BookSearchContext.Provider>
    );
};
