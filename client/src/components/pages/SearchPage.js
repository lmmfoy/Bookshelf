import NewBookSearch from "../NewBookSearch";
import BookTileGeneral from "../BookTileGeneral";

import { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";
import { BookSearchContext } from "../CurrentBookSearchContext";

const SearchPage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { newBooks, searchTerms, searchQuery, page, setNewBooks } =
        useContext(BookSearchContext);

    console.log(newBooks, searchTerms);

    // If pagination number changes, fetch 10 results based on new offset
    useEffect(() => {
        if (searchTerms.isbn) {
            console.log(searchTerms.isbn);
        } else {
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
        }
    }, [page]);

    return (
        <div>
            <NewBookSearch />
            <StyledResults>
                {newBooks &&
                    newBooks.map((book) => {
                        {
                            /* Only show works with ISBN numbers */
                        }
                        return (
                            book.isbn && (
                                <BookTileGeneral className="tile" key={book.key} book={book} />
                            )
                        );
                    })}
            </StyledResults>
            <AppPagination />
        </div>
    );
};

const StyledResults = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px;
    gap: 150px 70px;
    
    padding: 25px;

    .tile {
    }
`;

export default SearchPage;
