import styled from "styled-components";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SpecificBookDetails from "../BookDetailsSpecific";

// This page displays individual book details, allows the user to add the book to their shelves, and to add notes to the book
const SpecificBookPage = () => {
    const navigate = useNavigate();
    const isbn = useParams().isbn;
    // In case user tries searching with something that's not an ISBN
    const [isbnNotRecognized, setIsbnNotRecognized] = useState(false);

    // If got to this page by searching by an ISBN which is not valid, send user back to the search page
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
    min-height: 100%;

    .book-info {
        width: 100%;
        min-height: 100%;
    }
`;

export default SpecificBookPage;
