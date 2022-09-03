import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GeneralBookDetails from "../BookDetailsGeneral";
import SpecificBookDetails from "../BookDetailsSpecific";

const GeneralBookPage = () => {
    const location = useLocation();

    const book = location.state.book;

    return (
        <StyledBookWrapper>
            <div>
                <div className="book-info">
                        <GeneralBookDetails book={book} />
                </div>
                <div className="bookshelf">
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

export default GeneralBookPage;
