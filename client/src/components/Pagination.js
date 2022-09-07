import { Pagination } from "@mui/material";
import { useContext } from "react";
import { BookSearchContext } from "./CurrentBookSearchContext";
import styled from "styled-components";

// Pagination for search results on the search page
const AppPagination = () => {
    const { numPages, setPage } = useContext(BookSearchContext);

    // When page changed, set page
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

const StyledPagination = styled.div`
    margin: 0 auto 50px;
`;

export default AppPagination;
