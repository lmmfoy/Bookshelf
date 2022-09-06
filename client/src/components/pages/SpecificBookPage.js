import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SpecificBookDetails from "../BookDetailsSpecific";
import { useNavigate } from "react-router-dom";

const SpecificBookPage = () => {
    const navigate = useNavigate();

    const isbn = useParams().isbn;
    const [isbnNotRecognized, setIsbnNotRecognized] = useState(false);

    if (isbnNotRecognized) {
        navigate("/search");
    }
    return (
        <StyledBookWrapper>
            <div>
                <div className="book-info">
                    <SpecificBookDetails
                        isbn={isbn}
                        setIsbnNotRecognized={setIsbnNotRecognized}
                    />
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
