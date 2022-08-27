import NewBookSearch from "../NewBookSearch";
import NewBook from "../NewBook";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import AppPagination from "../Pagination";

import { useState, useContext } from "react";
import { BookSearchContext } from "../CurrentBookSearch";

const Homepage = () => {
    const currentSearchData = useContext(BookSearchContext)
    console.log(currentSearchData)
    
    return (
        <div>
            <NewBookSearch />
        </div>
    );
};

export default Homepage;
