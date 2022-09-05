import { Pagination } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { BookSearchContext } from "./CurrentBookSearchContext";

const pageSize = 3;

const AppPagination = () => {
    const { numPages, setPage } = useContext(BookSearchContext);

    const handleChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <Pagination
            count={Math.floor(numPages / 10) + 1}
            onChange={(e) => handleChange(e.target.textContent)}
        />
    );
};

export default AppPagination;
