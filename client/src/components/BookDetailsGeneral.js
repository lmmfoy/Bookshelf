import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book
const GeneralBookDetails = ({ book }) => {
    const navigate = useNavigate();

    const [editions, setEditions] = useState([]);
    const [options, setOptions] = useState([]);
    const [sortedOptions, setSortedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const x = () => {
        const unique = [];

        const x = options.filter((option) => {
            const dupe = unique.includes(option.label);

            if (!dupe) {
                unique.push(option);

                return true;
            }

            return false;
        });

        return unique;
        // setOptions(unique);
    };

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
                                "hardcover" ||
                            data.data.physical_format.toLowerCase() ===
                                "ebook") &&
                        (data.data.publish_year || data.data.publish_date) &&
                        data.data.publishers &&
                        data.data.authors &&
                        (data.data.isbn_13 || data.data.isbn_10)
                    ) {
                        setEditions((prev) => [...prev, data.data]);

                        setOptions((prev) => [
                            ...prev,
                            {
                                value: data.data.key,
                                label: `${
                                    data.data.publish_year ||
                                    data.data.publish_date
                                }, ${data.data.publishers.join(", ")}`,
                                book: data.data,
                            },
                        ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // options.filter((value, index) => {
            //     const _value = JSON.stringify(value);
            //     return index === options.findIndex(obj => {
            //         return JSON.stringify(obj) === _value;
            //     })
            // })
        });

        // setSortedOptions(
        //     options.sort((a, b) =>
        //         a.label > b.label ? 1 : b.label > a.label ? -1 : 0
        //     )
        // );

        //or:
        // const compare = (a, b) => {
        //     return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
        //   }

        // filter:
        // console.log(options.filter((option, index) => {
        //     return options.indexOf(option.label) === index;
        // }))

        // //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/ ----> not working
        // .then(
        //     setOptions([
        //         ...new Map(
        //             options.map((option) => [option.label, option])
        //         ).values(),
        //     ])
        // );
    }, []);

    // When an edition is selected, the reader is navigated to that edition's page
    const onChange = (e) => {
        console.log(e.book);
        navigate("/book", {
            state: { isbn: e.book.isbn_10 || e.book.isbn_13, book: e.book },
        });
    };

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
            <div className="book-details">
                <p>{book.title}</p>
                <p>{book.author_name && book.author_name.join(", ")}</p>
                {/* <p>{book.contributions && book.contributions.join(", ")}</p> */}
                <p>First published: {book.first_publish_year}</p>
                <div>
                    {/* https://github.com/JedWatson/react-select */}
                    <h3>Select edition:</h3>
                    <Select
                        defaultValue={selectedOption}
                        onChange={onChange}
                        options={options}
                        isSearchable={true}
                        autoFocus={true}
                        // filterOption={}
                    />
                </div>

                {/* publisher: {book.publisher} */}
            </div>
        </>
    );
};

export default GeneralBookDetails;
