import { useState } from "react";

// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

import { useEffect } from "react";

const SpecificBookDetails = ({ book }) => {
    const [authors, setAuthors] = useState([])


    useEffect(() => {
        book.authors.forEach((author) => {
            // author.key takes the form "/authors/author_id"
            fetch(`/search${author.key}`)
                .then((res) => res.json())
                .then((data) => {
                    setAuthors(prev => [prev, data.data]);
                });
            
        });
        console.log(authors);

    }, []);



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
                <p>{authors.map((author) => {
                    return <p>{author.name}</p>
                })}</p>
                <p>First published: {book.first_publish_year}</p>
                <p>Number of editions: {book.edition_count}</p>
                {/* publisher: {book.publisher} */}
            </div>
        </>
    );
};

export default SpecificBookDetails;
