import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GeneralBookDetails from "../BookDetailsGeneral";
import SpecificBookDetails from "../BookDetailsSpecific";

const BookPage = () => {
    const location = useLocation();

    const book = location.state.book;
    const isbn = location.state.isbn;

    return (
        <StyledBookWrapper>
            <h1>{book.title}</h1>
            <div>
                <div class="book-info">
                    {isbn ? (
                        <SpecificBookDetails book={book} isbn={isbn} />
                    ) : (
                        <GeneralBookDetails book={book} />
                    )}
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

    img {
        width: 300px;
        height: 450px;
    }
`;

export default BookPage;
