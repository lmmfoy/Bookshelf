import { useLocation } from "react-router-dom";
import styled from "styled-components";

import GeneralBookDetails from "../BookDetailsGeneral";

// This page renders when a book is searched for by author or title. It shows the editions of the book that the user can select.
// The book state is sent to the page via location.state
const GeneralBookPage = () => {
    const location = useLocation();
    const book = location.state.book;

    return (
        <StyledBookWrapper>
            <div>
                <div className="book-info">
                    <GeneralBookDetails book={book} />
                </div>
            </div>
        </StyledBookWrapper>
    );
};

const StyledBookWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

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

export default GeneralBookPage;
