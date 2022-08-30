import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/pages/LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "./components/pages/SearchPage";
import { BookSearchContextProvider } from "./components/CurrentBookSearch";
import BookPage from "./components/pages/BookPage";

const App = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <BrowserRouter>
            <GlobalStyles />
            {/* Only show header if user signed in */}
            <Header/>
            <Routes>
                <Route
                    path="/"
                    element={
                        // Redirect to Welcome page if not signed in
                        !isLoading &&
                        (isAuthenticated ? (
                            <Homepage />
                        ) : (
                            <Navigate replace to="/welcome" />
                        ))
                    }
                />
                <Route path="/search/isbn/:isbn" />
                <Route path="/search/authors/:author_id" />
                <Route path="/search/:search_terms" />
                <Route
                    path="/search"
                    element={
                        // !isLoading &&
                        // (isAuthenticated ? (
                        //     <SearchPage />
                        // ) : (
                        //     <Navigate replace to="/welcome" />
                        // ))
                        <SearchPage />
                    }
                />
                <Route path="/shelf" />
                <Route path="/book" element={<BookPage />} />
                <Route path="/friends" />
                <Route path="/user" />
                <Route path="/welcome" element={<LoggedOutWelcome />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
