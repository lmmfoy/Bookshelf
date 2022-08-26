const NewBook = ({book}) => {
    return (
        <div>
            title: {book.title}
            author: {book.author_name}
            year: {book.first_publish_year}
        </div>
    );
};

export default NewBook;
