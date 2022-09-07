import { useState, createContext } from "react";

export const BookSearchContext = createContext(null);

export const BookSearchContextProvider = ({ children }) => {
    // Keeping track of books from new search
    const [newBooks, setNewBooks] = useState([]);
    // Keeping track of the search pagination
    const [page, setPage] = useState(1);
    // Keeping track of how many pages of search results there are
    const [numPages, setNumPages] = useState(0);
    // Keeping track of search terms
    const [searchTerms, setSearchTerms] = useState({ author: "", title: "" });
    // Keeping track of the search query url
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
