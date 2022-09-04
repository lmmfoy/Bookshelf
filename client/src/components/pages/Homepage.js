import NewBookSearch from "../NewBookSearch";
import CondensedShelf from "../CondensedShelf";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";

import { useState, useContext, useEffect } from "react";
import { BookSearchContext } from "../CurrentBookSearchContext";
import { UserContext } from "../UserContext";

const Homepage = () => {
    const currentSearchData = useContext(BookSearchContext);
    const { shelves, setShelves, siteUser, setSiteUser } =
        useContext(UserContext);

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
                // Add the user's shelves to context if they exist
                .then((json) => {
                    if (json.data.shelves) {
                        console.log(json.data)
                        setShelves(json.data.shelves);
                    }
                    setSiteUser(user);
                });
    }, []);

    console.log(shelves)
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
