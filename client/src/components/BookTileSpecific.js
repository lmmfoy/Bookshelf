import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookTileSpecific = ({ book }) => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    console.log(book);

    const onBookClick = () => {
        navigate(`/book/${book.isbn || book.isbn_10 || book.isbn_13}`);
    };

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
    }, [])

    // const mouseOn = () => {
    //     book.authors &&
    //         book.authors.forEach((author) => {
    //             // author.key takes the form "/authors/author_id"
    //             fetch(`/search${author.key}`)
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     setAuthors((prev) => [prev, data.data.name]);
    //                 });
    //         });
    // };

    // const mouseOff = () => {
    //     setAuthors([]);
    // };

    return (
        <StyledNewBook
            onClick={onBookClick}
            // onMouseEnter={mouseOn}
            // onMouseLeave={mouseOff}
        >
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
                <div className="back">
                    <h5>{book.title && book.title}</h5>
                    {authors.map((author) => {
                        return (
                            <p key={Math.floor(Math.random() * 14000000000)}>
                                {author}
                            </p>
                        );
                    })}
                    <p className="italics">{book.publishers && book.publishers[0]}</p>
                    <p>{book.publish_date && book.publish_date}</p>
                </div>
            </div>
            {/* <p>{book.authors && book.authors.join(", ")}</p> */}
            {/* {book.publish_date && <p>{book.publish_date}</p>} */}
        </StyledNewBook>
    );
};

const StyledNewBook = styled.div`
    /* display: inline-block; */
    padding: 10px;
    width: 170px;
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
                    height: 170px;
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
