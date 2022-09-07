import NewBookSearch from "../NewBookSearch";
import CondensedShelf from "../CondensedShelf";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";

import { useState, useContext, useEffect } from "react";
import { BookSearchContext } from "../CurrentBookSearchContext";
import { UserContext } from "../UserContext";

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const currentSearchData = useContext(BookSearchContext);
    const { shelves, setShelves, siteUser, setSiteUser } =
        useContext(UserContext);

    const { user, isAuthenticated } = useAuth0();

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
                        setShelves(json.data.shelves);
                    }
                    setSiteUser(user);
                })
                .then(() => {
                    setIsLoading(false);
                });
    }, []);


    return (
        <StyledHome>
            <div className="shelf">
            
                <CondensedShelf isLoading={isLoading}/>
            </div>
            <div className="search">
                <NewBookSearch />
            </div>

            {/* <div className="test9"></div>
            <div className="test"></div>
            <div className="test2"></div>
            <div className="test3"></div>
            <div className="test4"></div>
            <div className="test5"></div>
            <div className="test7"></div>
            <div className="test6"></div>
            <div className="test8"></div> */}
        </StyledHome>
    );
};

const StyledHome = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1900px;


    .shelf {
        width: 80%;
        height: 100vh;
        /* background-color: var(--color-american-bronze); */
    }

    .search {
        /* background-color: var(--color-coffee-brown); */
    }

    .test {
        background-color: var(--color-maroon-red);
        width: 50px;
    }
    .test2 {
        background-color: var(--color-maroon);
        width: 50px;
    }
    .test3 {
        background-color: var(--color-burnt-orange-brown);
        width: 50px;
    }
    .test4 {
        background-color: var(--color-brick-red);
        width: 50px;
    }
    .test5 {
        background-color: var(--color-dark-red);
        width: 50px;
    }
    .test6 {
        background-color: var(--color-brown-brown);
        width: 50px;
    }
    .test7 {
        background-color: var(--color-saddle-brown);
        width: 50px;
    }
    .test8 {
        background-color: var(--color-philippine-bronze);
        width: 50px;
    }
    .test9 {
        background-color: var(--color-american-bronze);
        width: 50px;
    }
`;

export default Homepage;
