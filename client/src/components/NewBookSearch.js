import styled from "styled-components";

const NewBookSearch = () => {

    // When form submitted, make fetch request to get back search data
    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            author: e.target[0].value,
            title: e.target[1].value,
        };

        // Filter out the items in the params with empty values, then join the search parameters together
        const search_terms = Object.keys(params)
            .filter((param) => params[param])
            .map((param) => `${param}=${params[param]}`)
            .join("&");
        
        fetch(`/search/${search_terms}&language=eng`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
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
