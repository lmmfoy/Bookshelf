import NewBookSearch from "../NewBookSearch";
import NewBook from "../NewBook";

import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";
import { BookSearchContext } from "../CurrentBookSearch";

const SearchPage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { newBooks, searchTerms } = useContext(BookSearchContext);

    console.log(newBooks, searchTerms);

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


`;

export default SearchPage;
