import { useEffect } from "react";
import styled from "styled-components";

const NewBook = ({ book }) => {
    return (
        <StyledNewBook>
            {
                // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                book.cover_i ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?`}
                        alt={`${book.title} book cover`}
                    />
                ) : (
                    <img src="images/book-cover.png" alt="book cover" />
                )
            }
            title: {book.title}
            author: {book.author_name}
            year: {book.first_publish_year}
            {/* publisher: {book.publisher} */}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    padding: 10px;
    border: 1px solid black;
    /* max-width: 200px; */
    min-width: 100px;

    img {
        max-width: 80px;
    }
`;

export default NewBook;
