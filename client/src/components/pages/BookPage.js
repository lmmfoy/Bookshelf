import { useLocation } from "react-router-dom";
import styled from "styled-components";

const BookPage = () => {
    const location = useLocation();

    const book = location.state.book;

    return (
        <StyledBookWrapper>
            <h1>{book.title}</h1>
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
            {book.title}
        </StyledBookWrapper>
    );
};

const StyledBookWrapper = styled.div`
    display: grid;

    h1 {
        font-size: 2em;
    }
`;

export default BookPage;
