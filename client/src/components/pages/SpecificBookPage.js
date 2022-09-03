import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SpecificBookDetails from "../BookDetailsSpecific";

const SpecificBookPage = () => {
    const isbn = useParams().isbn
    console.log(isbn)

    return (
        <StyledBookWrapper>
            <div>
                <div className="book-info">
                        <SpecificBookDetails isbn={isbn} />
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

export default SpecificBookPage;
