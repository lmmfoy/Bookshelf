import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { BookSearchContext } from "./CurrentBookSearchContext";
import { useNavigate } from "react-router-dom";

const NewBookSearch = () => {
    const navigate = useNavigate();
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
            author: searchTerms.author.replace(/ /g, "+"),
            title: searchTerms.title.replace(/ /g, "+"),
        };
        console.log(params)

        if (!params.author && !params.title) {
            return;
        } else {
            // Save the search terms so that when user searches on homepage and is redirected to Search page, their search terms remain
            // setSearchTerms(params);

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
        }
    };

    // If user searches by ISBN, they will be taken directly to the page of that book, rather than to a list of results
    // This function fetches the result of the ISBN search, sets the information in Context, and navigates directly to the book page
    const handleISBNSubmit = (e) => {
        e.preventDefault();
        // setSearchTerms({ isbn: e.target[0].value });

        navigate(`/book/${e.target[0].value}`);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerms({ ...searchTerms, [e.target.name]: value });
    };

    return (
        <StyledFormPage>
            <h2>Add to your books</h2>
            <div className="forms">
                <StyledForm onSubmit={handleSubmit}>
                    <h3>General Search</h3>
                    <label for="author">
                        <span>Author:</span>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            defaultValue={searchTerms.author}
                            onChange={handleChange}
                        />
                    </label>
                    <label for="title">
                        <span>Title:</span>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={searchTerms.title}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Search</button>
                </StyledForm>
                <StyledForm onSubmit={handleISBNSubmit}>
                    <h3>Search by ISBN</h3>
                    <label for="isbn">
                        <span>ISBN:</span>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            defaultValue={searchTerms.isbn}
                            required
                        />
                    </label>
                    <button type="submit">Search</button>
                </StyledForm>
            </div>
        </StyledFormPage>
    );
};

const StyledFormPage = styled.div`
    margin: 0 25px 25px 25px;
    /* max-width: 700px; */
    min-width: 400px;

    h2 {
        margin: 0 25px;
    }

    .forms {
        display: flex;
        flex-wrap: wrap;
    }
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    border: 2px solid var(--color-burnt-orange-brown);
    box-shadow: 10px 5px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 25px;
    padding: 20px;
    width: 400px;
    flex-grow: 1;
    flex-shrink: 1;

    h3 {
        margin-bottom: 20px;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        padding: 8px 0;
        font-size: 1.1em;

        span {
            width: 100px;
        }

        input {
            line-height: 1.8em;
            font-size: 1em;
            width: 100%;
        }
    }

    button {
        align-self: flex-end;
        margin: 12px 8px 5px;
    }
`;

export default NewBookSearch;
