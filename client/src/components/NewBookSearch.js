import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { BookSearchContext } from "./CurrentBookSearch";
import { useNavigate } from "react-router-dom";

const NewBookSearch = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState({});
    const {
        setNewBooks,
        page,
        setPage,
        setNumPages,
        searchTerms,
        setSearchTerms,
    } = useContext(BookSearchContext);

    // When form submitted, make fetch request to get back search data
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the user values and replace spaces with "+"
        const params = {
            author: e.target[0].value.replace(/ /g, "+"),
            title: e.target[1].value.replace(/ /g, "+"),
        };

        setSearchTerms(params);

        // Filter out the items in the params with empty values, then join the search parameters together
        const search_query = Object.keys(params)
            .filter((param) => params[param])
            .map((param) => {
                return `${param}=${params[param]}`;
            })
            .join("&");

        setSearchQuery(search_query);

        // Fetch first 10 books that satisfy search criteria
        fetch(`/search/${search_query}&language=eng&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                setNewBooks(data.data.bookInfo);
                setNumPages(data.data.numFound);
                navigate("/search")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // If pagination number changed, fetch 10 results based on new offset
    useEffect(() => {
        fetch(
            `/search/${searchQuery}&language=eng&limit=10&offset=${
                page * 10 - 10
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                setNewBooks(data.data.bookInfo);
                console.log(page);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [page, setNewBooks, searchQuery]);

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label for="author">
                Author:
                <input
                    type="text"
                    id="author"
                    name="author"
                    defaultValue={searchTerms.author}
                />
            </label>
            <label for="title">
                Title:
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={searchTerms.title}
                />
            </label>
            <button type="submit">Search</button>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;

export default NewBookSearch;
