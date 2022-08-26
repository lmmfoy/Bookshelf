import styled from "styled-components";

const NewBookSearch = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const author = e.target[0].value;
        const title = e.target[1].value;

        let search_terms;

        if (author && !title) {
            search_terms = `author=${author}`
        } else if (author && title) {
            search_terms = `author=${author}&title=${title}`
        } else if (!author && title) {
            search_terms = `title=${title}`
        } else {
            return false;
        }
  

        fetch(`/search/${search_terms}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label for="author">
                Author:
                <input type="text" id="author" name="author" />
            </label>
            <label for="title">
                Title:
                <input type="text" id="title" name="title" />
            </label>
            <button type="submit">Search</button>
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
