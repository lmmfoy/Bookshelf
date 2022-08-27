import styled from "styled-components";

const NewBook = ({book}) => {
    return (
        <StyledNewBook>
            title: {book.title}
            author: {book.author_name}
            year: {book.first_publish_year}
            {/* publisher: {book.publisher} */}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div `
    padding: 10px;
    border: 1px solid black;
`

export default NewBook;
