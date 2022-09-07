import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// These book cards are shown on the shelves on the homepage
const BookTileSpecific = ({ book }) => {
    const navigate = useNavigate();
    // Keep track of authors
    const [authors, setAuthors] = useState([]);

    // When user clicks card, is navigated to specific book page
    const onBookClick = () => {
        navigate(`/book/${book.isbn || book.isbn_10 || book.isbn_13}`);
    };

    // Fetches the authors for the book
    useEffect(() => {
        book.authors &&
            book.authors.forEach((author) => {
                // author.key takes the form "/authors/author_id"
                fetch(`/search${author.key}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setAuthors((prev) => [prev, data.data.name]);
                    });
            });
    }, []);

    return (
        <StyledNewBook onClick={onBookClick}>
            <div className="book-inner">
                <div className="front">
                    <div className="cover">
                        {
                            // If the book entry has a cover ID, show the OpenLibrary cover, else show a generic cover
                            book.covers ? (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg?`}
                                    alt={`${book.title} book cover`}
                                />
                            ) : (
                                <img
                                    src="images/book-cover.png"
                                    alt="book cover"
                                />
                            )
                        }
                    </div>
                    <p>{book.title && book.title}</p>
                </div>
                {/* This is shown when card hovered over */}
                <div className="back">
                    <h5>{book.title && book.title}</h5>
                    {authors.map((author) => {
                        return (
                            <p key={Math.floor(Math.random() * 14000000000)}>
                                {author}
                            </p>
                        );
                    })}
                    <p className="italics">
                        {book.publishers && book.publishers[0]}
                    </p>
                    <p>{book.publish_date && book.publish_date}</p>
                </div>
            </div>
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    padding: 10px;
    width: 190px;
    flex: 0 1 auto;
    text-align: center;
    padding: 20px;
    perspective: 1000px;

    box-shadow: 0 0 20px #aaa;
    border-radius: 5px;

    .book-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 1s;
        transform-style: preserve-3d;
        .front,
        .back {
            width: 100%;
            height: 100%;
            /* This hides the content from the opposite side. The transform is necessary for Firefox */
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            transform: rotateX(0deg);
        }

        .front {
            .cover {
                overflow: hidden;
                margin-bottom: 10px;

                img {
                    max-width: 100%;
                    max-height: 170px;
                }
            }
        }

        .back {
            position: absolute;
            top: 0;
            transform: rotateY(180deg);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .italics {
                font-style: italic;
            }
        }
    }

    .book-inner.is-flipped {
        transform: rotateY(180deg);
    }

    &:hover .book-inner {
        transform: rotateY(180deg);
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.43);
        transition: 1s ease-in-out;
    }
`;

export default BookTileSpecific;
