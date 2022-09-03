import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { BookSearchContext } from "./CurrentBookSearchContext";
import { useNavigate } from "react-router-dom";

const NewBookSearch = () => {
    const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState({});
    const {
        setNewBooks,
        page,
        setPage,
        setNumPages,
        searchTerms,
        setSearchTerms,
        searchQuery,
        setSearchQuery,
    } = useContext(BookSearchContext);

    // This function fetches a list of books based on the search criteria (author and/or title), sets the information in Context, and navigates the user to the Search page to see the list of results
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the user values and replace spaces with "+"
        const params = {
            author: e.target[0].value.replace(/ /g, "+"),
            title: e.target[1].value.replace(/ /g, "+"),
        };

        // Save the search terms so that when user searches on homepage and is redirected to Search page, their search terms remain
        setSearchTerms(params);

        // Filter out the items in the params with empty values, then join the search parameters together
        const search_query = Object.keys(params)
            .filter((param) => params[param])
            .map((param) => {
                return `${param}=${params[param]}`;
            })
            .join("&");

        // Used in fetch below, and fetch in useEffect on Search page
        setSearchQuery(search_query);

        // Fetch first 10 books that satisfy search criteria
        fetch(`/search/${search_query}&language=eng&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setNewBooks(data.data.bookInfo); // Set all books that meet search criteria in state (in context)
                setNumPages(data.data.numFound); // Set number of pages of books
                navigate("/search"); // Navigate to Search page
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // If user searches by ISBN, they will be taken directly to the page of that book, rather than to a list of results
    // This function fetches the result of the ISBN search, sets the information in Context, and navigates directly to the book page
    const handleISBNSubmit = (e) => {
        e.preventDefault();

        setSearchTerms({ isbn: e.target[0].value });

        navigate(`/book/${e.target[0].value}`);
    };

    return (
        <>
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
            <StyledForm onSubmit={handleISBNSubmit}>
                <label for="isbn">
                    ISBN:
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        defaultValue={searchTerms.isbn}
                    />
                </label>
                <button type="submit">Search</button>
            </StyledForm>
        </>
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
