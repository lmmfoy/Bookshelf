// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book

const GeneralBookDetails = ({ book }) => {
    console.log(book)
    return (
        <>
            {
                // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                book.cover_i ? (
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?`}
                        alt={`${book.title} book cover`}
                    />
                ) : (
                    <img src="images/book-cover.png" alt="book cover" />
                )
            }
            <div class="book-details">
                <p>{book.title}</p>
                <p>{book.author_name.join(", ")}</p>
                <p>First published: {book.first_publish_year}</p>
                <p>Number of editions: {book.edition_count}</p>
                {/* publisher: {book.publisher} */}
            </div>
        </>
    );
};

export default GeneralBookDetails;
