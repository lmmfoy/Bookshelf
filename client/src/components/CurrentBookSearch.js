import { useState, createContext } from "react";

export const BookSearchContext = createContext(null);

export const BookSearchContextProvider = ({ children }) => {
    const [newBooks, setNewBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [searchTerms, setSearchTerms] = useState({});
    console.log(newBooks, page, numPages, searchTerms)

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
            }}
        >
            {children}
        </BookSearchContext.Provider>
    );
};
