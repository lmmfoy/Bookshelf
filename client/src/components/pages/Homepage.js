import NewBookSearch from "../NewBookSearch";
import NewBook from "../NewBook";

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Homepage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [newBooks, setNewBooks] = useState([])
    console.log(newBooks)

    return (
        <div>
            <NewBookSearch setNewBooks={setNewBooks}/>
            <div>
                {
                    newBooks.map((book) => {
                        return <NewBook book={book}/>
                    })
                }
            </div>
        </div>
    );
};

export default Homepage;
