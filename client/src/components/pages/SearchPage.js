import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import RingLoader from "react-spinners/RingLoader";

import NewBookSearch from "../NewBookSearch";
import BookTileGeneral from "../BookTileGeneral";
import AppPagination from "../Pagination";

import { BookSearchContext } from "../CurrentBookSearchContext";

// This page renders when a user searches by author or title from the homepage.
// It allows for author/title searches and searches by ISBN
const SearchPage = () => {
    const { newBooks, searchTerms, searchQuery, page, setNewBooks } =
        useContext(BookSearchContext);
    // This keeps track of searches that yield no results
    const [noBooks, setNoBooks] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // If the user changes the pagination number, fetch 10 results from the OpenLibrary API based on the new offset
    useEffect(() => {
        fetch(
            `/search/${searchQuery}&language=eng&limit=10&offset=${
                page * 10 - 10
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                // If no books found, set noBooks to true
                if (data.data.numFound === 0) {
                    setNoBooks(true);
                } else {
                    // Add results to newBooks, set noBooks to false
                    setNewBooks(data.data.bookInfo);
                    setNoBooks(false);
                }
            })
            // Update loading state
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [page]);

    return (
        <StyledSearchPage setIsLoading={setIsLoading}>
            <NewBookSearch />

            {/* Show loading animation until search results are fetched */}
            <StyledResults>
                {isLoading ? (
                    <div className="loading-div">
                        <RingLoader
                            loading={isLoading}
                            className="loader"
                            color={"var(--color-burnt-orange-brown)"}
                            size={100}
                        />
                    </div>
                ) : (
                    <>
                        {/* If there are book results, render those that include ISBN in the book object */}
                        {newBooks &&
                            newBooks.map((book) => {
                                return (
                                    book.isbn && (
                                        <BookTileGeneral
                                            className="tile"
                                            key={book.key}
                                            book={book}
                                        />
                                    )
                                );
                            })}

                        {/* If no books found */}
                        {noBooks && <div>NO RESULTS FOUND</div>}
                    </>
                )}
            </StyledResults>
            <AppPagination className="pagination" />
        </StyledSearchPage>
    );
};

const StyledSearchPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: 1700px;
`;

const StyledResults = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px;
    gap: 150px 70px;
    padding: 25px;
`;

export default SearchPage;
