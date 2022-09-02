import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/pages/LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "./components/pages/SearchPage";
import BookPage from "./components/pages/BookPage";
import { useEffect, useState, useContext } from "react";
// import { UserContext } from "./components/UserContext";

const App = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // const { siteUser, setSiteUser } = useContext(UserContext);

    // const determineLoginState = async () => {
    //     await isAuthenticated;
    //     isAuthenticated && setSiteUser({email: user.email, });
    // };

    // determineLoginState();


    return (
        <BrowserRouter>
            <GlobalStyles />
            {/* Only show header if user signed in */}
            {!isLoading &&
                (isAuthenticated ? (
                    <>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/search/isbn/:isbn" />
                            <Route path="/search/authors/:author_id" />
                            <Route path="/search/:search_terms" />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/shelf" />
                            <Route path="/book" element={<BookPage />} />
                            <Route path="/friends" />
                            <Route path="/user" />
                            <Route
                                path="/welcome"
                                element={<LoggedOutWelcome />}
                            />
                        </Routes>
                    </>
                ) : (
                    <>
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
                            <Route
                                path="/welcome"
                                element={<LoggedOutWelcome />}
                            />
                        </Routes>
                    </>
                ))}
        </BrowserRouter>
    );
};

export default App;
