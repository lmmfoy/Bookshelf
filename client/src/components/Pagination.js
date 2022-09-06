import { Pagination } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { BookSearchContext } from "./CurrentBookSearchContext";
import styled from "styled-components";

const pageSize = 3;

const AppPagination = () => {
    const { numPages, setPage } = useContext(BookSearchContext);

    const handleChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <StyledPagination>
            <Pagination
                count={Math.floor(numPages / 10) + 1}
                onChange={(e) => handleChange(e.target.textContent)}
            />
        </StyledPagination>
    );
};

const StyledPagination = styled.div `
    margin: 0 auto 50px;
`
export default AppPagination;
