import { useLocation } from "react-router-dom";

const BookPage = () => {
    const location = useLocation();
    
    const book = location.state.book;
    
    return <div>{book.title}</div>;
};

export default BookPage;
