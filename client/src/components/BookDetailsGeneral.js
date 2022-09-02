import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { BookSearchContext } from "./CurrentBookSearchContext";

// This shows the book details of books found using the general search (with author/title)
// It may show multiple editions of the same book
const GeneralBookDetails = ({ book }) => {
    const { setNewBooks } = useContext(BookSearchContext);

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

        setOptions(unique);
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
                        data.data.publishers
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

        // //https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/ ----> not working
        // .then(
        //     setOptions([
        //         ...new Map(
        //             options.map((option) => [option.label, option])
        //         ).values(),
        //     ])
        // );

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
        // options.filter((option, index) => {
        //     return options.indexOf(option.label) === index;
        // })
    }, []);

    useEffect(() => {
        console.log(selectedOption.book);
        //     setNewBooks(data.data);
        //     navigate("/book", {
        //         state: { isbn: e.target[0].value, book: data.data },
        //     });
    }, [selectedOption]);

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
                {/* <p>{book.contributions && book.contributions.join(", ")}</p> */}
                <p>First published: {book.first_publish_year}</p>
                <div>
                    {/* https://github.com/JedWatson/react-select */}
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
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
