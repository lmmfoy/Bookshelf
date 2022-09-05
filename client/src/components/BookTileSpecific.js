import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookTileSpecific = ({ book }) => {
    const navigate = useNavigate();

    const onBookClick = () => {
        navigate(`/book/${book.isbn || book.isbn_10 || book.isbn_13}`);
    };

    console.log(book);
    return (
        <StyledNewBook onClick={onBookClick}>
            {
                // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                book.covers ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg?`}
                        alt={`${book.title} book cover`}
                    />
                ) : (
                    <img src="images/book-cover.png" alt="book cover" />
                )
            }
            <p>{book.title && book.title}</p>
            <p>{book.author && book.author_name.join(", ")}</p>
            {book.publish_date && <p>{book.publish_date}</p>}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    padding: 10px;
    width: 200px;
    flex: 1 1 auto;
    text-align: center;
    min-height: 250px;
    padding: 20px;

    img {
        max-width: 80px;
    }
`;

export default BookTileSpecific;
