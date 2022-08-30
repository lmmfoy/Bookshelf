import NewBookSearch from "../NewBookSearch";
import NewBook from "../BookTile";
import CondensedShelf from "../CondensedShelf";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";

import { useState, useContext, useEffect } from "react";
import { BookSearchContext } from "../CurrentBookSearch";

const Homepage = () => {
    const currentSearchData = useContext(BookSearchContext);
    console.log(currentSearchData);

    const { user, isLoading, isAuthenticated } = useAuth0();

    useEffect(() => {
        isAuthenticated &&
            fetch("/user", {
                method: "POST",
                body: JSON.stringify({
                    _id: user.sub,
                    email: user.email,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                });
    }, []);

    return (
        <StyledHome>
            <div>
                <CondensedShelf />
            </div>
            <div>
                <NewBookSearch />
            </div>
        </StyledHome>
    );
};

const StyledHome = styled.div`
    display: flex;
`;

export default Homepage;
