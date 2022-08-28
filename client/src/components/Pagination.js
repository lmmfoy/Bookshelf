import { Pagination } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { BookSearchContext } from "./CurrentBookSearch";

const pageSize = 3;

const AppPagination = () => {
    const { numPages, setPage } = useContext(BookSearchContext);
    // const bookData = (from, to) => {
    //     return new Promise((resolve, reject) => {
    //         const data = newBooks.slice(from, to)

    //         resolve({
    //             count: newBooks.length,
    //             data: data
    //         })
    //     })
    // }

    // useEffect(() => {

    // })

    // const [pagination, setPagination] = useState({
    //     count: 0,
    //     from: 0,
    //     to: pageSize,
    // });

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
