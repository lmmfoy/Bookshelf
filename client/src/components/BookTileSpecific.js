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
            <div className="cover">
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
            </div>
            <p>{book.title && book.title}</p>
            {/* <p>{book.authors && book.authors.join(", ")}</p> */}
            {/* {book.publish_date && <p>{book.publish_date}</p>} */}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    /* display: inline-block; */
    padding: 10px;
    width: 170px;
    flex: 0 1 auto;
    text-align: center;
    /* min-height: 250px; */
    padding: 20px;

    box-shadow: 0 0 20px #aaa;
    border-radius: 5px;

    .cover {
        overflow: hidden;
        margin-bottom: 10px;
    }
    img {
        max-width: 100%;
        height: 170px;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.43);
        transition: 0.4s ease-in-out;
    }
`;

export default BookTileSpecific;
