import { useState } from "react";

// This shows the details of a book found using the ISBN search
// It will show only one specific edition of a book

import { useEffect } from "react";

const SpecificBookDetails = ({ book, isbn }) => {
    const [authors, setAuthors] = useState([])

    console.log(book)
    useEffect(() => {
        book.authors.forEach((author) => {
            // author.key takes the form "/authors/author_id"
            fetch(`/search${author.key}`)
                .then((res) => res.json())
                .then((data) => {
                    setAuthors(prev => [prev, data.data]);
                });
            
        });

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
                    {/* author info - links, fuller_name, photos, birth_date, death_date, alternate_names, bio, wikipedia */}
                })}</p>
                <p>Published: {book.publish_date}, {book.publish_places && <span>{book.publish_places.join(", ")}, </span>} {book.publishers.join(", ")}</p>
                <p>ISBN: {isbn}</p>
                <p>{book.pagination && <span>Pages: {book.pagination}</span>} </p>
                <p>{book.notes}</p>
                {/* identifiers for different places: {book.identifiers} */}
            </div>
        </>
    );
};

export default SpecificBookDetails;
