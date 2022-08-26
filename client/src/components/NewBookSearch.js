import styled from "styled-components";

const NewBookSearch = () => {
    return (
        <StyledForm>
            <label for="author">
                Author:
                <input type="text" id="author" name="author" />
            </label>
            <label for="title">
                Title:
                <input type="text" id="title" name="title" />
            </label>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;

export default NewBookSearch;
