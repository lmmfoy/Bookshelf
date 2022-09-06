import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookTileGeneral = ({ book }) => {
    const navigate = useNavigate();

    const onBookClick = () => {
        navigate("/book", { state: { book: book } });
        // navigate(`/book/title${book.key}`, { state: { type: "general", book: book } });
    };

    return (
        <StyledNewBook onClick={onBookClick}>
            <div className="img-div">
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
            </div>
            <div className="book-info">
                <h4>{book.title && book.title}</h4>
                <>
                    {book.author_name &&
                        (book.author_name.length > 2 ? (
                            <h5>
                                {book.author_name[0]}, {book.author_name[1]},
                                etc.
                            </h5>
                        ) : (
                            <h5>{book.author_name.join(", ")}</h5>
                        ))}
                </>
                {book.first_publish_year && (
                    <p>First published: {book.first_publish_year}</p>
                )}
                {book.edition_count && (
                    <p>Number of editions: {book.edition_count}</p>
                )}
            </div>
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    padding: 30px 0px 0px 0px;
    width: 200px;
    flex: 1 1 auto;
    text-align: center;
    min-height: 350px;
    max-width: 250px;
    min-width: 230px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 10px 20px 5px rgba(0, 0, 0, 0.33);
    color: var(--color-beige);
    line-height: 1.2em;

    h4 {
        font-size: 1.3em;
        margin-bottom: 10px;
    }

    h5 {
        margin-bottom: 15px;
        font-size: 1em;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.43);
        transition: 0.4s ease-in-out;
    }

    .img-div {
        margin-bottom: 20px;
    }

    img {
        box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.33);
        height: 200px;
        margin: -60px 0 0 0;
    }

    .book-info {
        padding: 30px 20px;
        background-color: #334b38;
        height: 250px;
        border-radius: 10px;
        overflow: hidden;
        /* border: 2px solid black; */
    }
`;

export default BookTileGeneral;
