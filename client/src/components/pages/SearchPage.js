import NewBookSearch from "../NewBookSearch";
import NewBook from "../NewBook";

import { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";
import { BookSearchContext } from "../CurrentBookSearch";

const SearchPage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { newBooks, searchTerms, searchQuery, page, setNewBooks } = useContext(BookSearchContext);

    console.log(newBooks, searchTerms);
    
        // If pagination number changes, fetch 10 results based on new offset
        useEffect(() => {
            console.log("HERE");
            fetch(
                `/search/${searchQuery}&language=eng&limit=10&offset=${
                    page * 10 - 10
                }`
            )
                .then((res) => res.json())
                .then((data) => {
                    setNewBooks(data.data.bookInfo);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, [page, setNewBooks, searchQuery]);

    return (
        <div>
            <NewBookSearch />
            <StyledResults>
                {newBooks &&
                    newBooks.map((book) => {
                        return <NewBook book={book} />;
                    })}
            </StyledResults>
            <AppPagination />
        </div>
    );
};

const StyledResults = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

`;

export default SearchPage;
