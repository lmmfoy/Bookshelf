import { useEffect, useState } from "react";
// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book
const GeneralBookDetails = ({ book }) => {
    const [editions, setEditions] = useState([]);

    console.log(book);

    useEffect(() => {
        book.edition_key.forEach((key) => {
            fetch(`/search/ol/${key}`)
                .then((res) => res.json())
                .then((data) => {
                    if (
                        (!data.data.languages ||
                            data.data.languages[0].key === "/languages/eng") &&
                        (!data.data.physical_format ||
                            data.data.physical_format.toLowerCase() ===
                                "paperback" ||
                            data.data.physical_format.toLowerCase() ===
                                "hardcover")
                    ) {
                        console.log(data.data);
                        setEditions((prev) => [...prev, data.data]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }, []);

    console.log(editions);

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
                <p>{book.author_name && book.author_name.join(", ")}</p>
                <p>First published: {book.first_publish_year}</p>
                <form>
                    <select name="editions" id="editions"  required>
                        <option value="" disabled selected>Edition:</option>
                        {editions.map((edition) => {
                            return <option>{edition.publish_date}</option>;
                        })}
                    </select>
                </form>
 
                {/* publisher: {book.publisher} */}
            </div>
        </>
    );
};

export default GeneralBookDetails;
