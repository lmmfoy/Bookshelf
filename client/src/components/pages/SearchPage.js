import NewBookSearch from "../NewBookSearch";
import BookTileGeneral from "../BookTileGeneral";

import { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";
import { BookSearchContext } from "../CurrentBookSearchContext";
import RingLoader from "react-spinners/RingLoader";

const SearchPage = () => {
    const { newBooks, searchTerms, searchQuery, page, setNewBooks } =
        useContext(BookSearchContext);
    const [noBooks, setNoBooks] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    console.log(newBooks, searchTerms);

    // If pagination number changes, fetch 10 results based on new offset
    useEffect(() => {
        if (searchTerms.isbn) {
        } else {
            fetch(
                `/search/${searchQuery}&language=eng&limit=10&offset=${
                    page * 10 - 10
                }`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    if (data.data.numFound === 0) {
                        setNoBooks(true);
                    } else {
                        setNewBooks(data.data.bookInfo);
                        setNoBooks(false);
                    }
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [page]);

    console.log(newBooks);
    return (
        <StyledSearchPage setIsLoading={setIsLoading}>
            <NewBookSearch />
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
                        {newBooks &&
                            newBooks.map((book) => {
                                {
                                    /* Only show works with ISBN numbers */
                                }
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

    .tile {
    }
`;

export default SearchPage;
