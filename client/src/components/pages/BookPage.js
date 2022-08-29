import { useLocation } from "react-router-dom";
import styled from "styled-components";

const BookPage = () => {
    const location = useLocation();

    const book = location.state.book;
    console.log(book);

    return (
        <StyledBookWrapper>
            <h1>{book.title}</h1>
            <div>
                <div class="book-info">
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
                    <div class="book-details">
                        <p>{book.title}</p>
                        <p>{book.author_name.join(", ")}</p>
                        <p>First published: {book.first_publish_year}</p>
                        <p>Number of editions: {book.edition_count}</p>
                        {/* publisher: {book.publisher} */}
                    </div>
                </div>
                <div class="bookshelf">
                    <h2></h2>
                </div>
            </div>
        </StyledBookWrapper>
    );
};

const StyledBookWrapper = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 2em;
    }

    .book-info {
        display: flex;
    }
`;

export default BookPage;
