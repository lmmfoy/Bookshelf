import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import NewBookSearch from "../NewBookSearch";
import CondensedShelf from "../CondensedShelf";

import { UserContext } from "../UserContext";

// This is the user dashboard
const Homepage = () => {
    // Keeping track of when bookshelf is loaded
    const [isLoading, setIsLoading] = useState(true);

    const { setShelves, setSiteUser } = useContext(UserContext);

    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        // When user is authenticated by Auth0, fetch the user information from the MongoDB database
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
                // Add the user's shelves to context if they exist, then set the user in context
                .then((json) => {
                    if (json.data.shelves) {
                        setShelves(json.data.shelves);
                    }
                    setSiteUser(user);
                })
                // Indicate loading is finished
                .then(() => {
                    setIsLoading(false);
                });
    }, []);

    return (
        <StyledHome>
            <div className="shelf">
                <CondensedShelf isLoading={isLoading} />
            </div>
            <div className="search">
                <NewBookSearch />
            </div>
        </StyledHome>
    );
};

const StyledHome = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1750px;

    .shelf {
        width: 80%;
        height: 100vh;
    }
`;

export default Homepage;
