import { useEffect, useState } from "react";
import styled from "styled-components";

const NewBookSearch = ({ setNewBooks, page, setPage, setNumPages }) => {
    const [searchTerms, setSearchTerms] = useState({});

    // When form submitted, make fetch request to get back search data
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the user values and replace spaces with "+"
        const params = {
            author: e.target[0].value.replace(/ /g, "+"),
            title: e.target[1].value.replace(/ /g, "+"),
        };

        // Filter out the items in the params with empty values, then join the search parameters together
        const search_terms = Object.keys(params)
            .filter((param) => params[param])
            .map((param) => {
                return `${param}=${params[param]}`;
            })
            .join("&");

        setSearchTerms(search_terms);

        fetch(`/search/${search_terms}&language=eng&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                setNewBooks(data.data.bookInfo);
                console.log(data.data);
                setNumPages(data.data.numFound);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch(
            `/search/${searchTerms}&language=eng&limit=10&offset=${
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
    }, [page]);

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label for="author">
                Author:
                <input type="text" id="author" name="author" />
            </label>
            <label for="title">
                Title:
                <input type="text" id="title" name="title" />
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
