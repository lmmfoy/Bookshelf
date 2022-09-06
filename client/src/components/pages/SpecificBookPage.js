import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SpecificBookDetails from "../BookDetailsSpecific";

const SpecificBookPage = () => {
    const isbn = useParams().isbn;
    console.log(isbn)

    return (
        <StyledBookWrapper>
            <div>
                <div className="book-info">
                    <SpecificBookDetails isbn={isbn} />
                </div>
            </div>
        </StyledBookWrapper>
    );
};

const StyledBookWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 50px;

    .book-info {
        width: 100%;
    }
`;

export default SpecificBookPage;
