import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookTile = ({ book }) => {
    const navigate = useNavigate();

    const onBookClick = () => {        
        navigate("/book", { state: { book: book } });
    };

    if (book.edition_count > 1) {
        console.log(book.edition_count, book.title)
    }


    return (
        <StyledNewBook onClick={onBookClick}>
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
            <p>{book.title}</p>
            <p>{book.author_name.join(", ")}</p>
            <p>First published: {book.first_publish_year}</p>
            <p>Number of editions: {book.edition_count}</p>
            {/* publisher: {book.publisher} */}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    padding: 10px;
    border: 1px solid black;
    width: 200px;
    flex: 1 1 auto;
    text-align: center;
    min-height: 250px;
    padding: 20px;

    img {
        max-width: 80px;
    }

    .link {
        text-decoration: none;
        color: black;

        &:hover {
            color: purple;
        }
    }
`;

export default BookTile;
