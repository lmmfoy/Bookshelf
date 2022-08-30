import styled from "styled-components";

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = () => {
    return (
        <StyledShelf>
            <p>hi</p>
        </StyledShelf>
    );
};

const StyledShelf = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid black;
`;

export default CondensedShelf;
