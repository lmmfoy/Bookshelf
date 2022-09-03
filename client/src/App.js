import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/pages/LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "./components/pages/SearchPage";
import BookPage from "./components/pages/BookPage";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./components/UserContext";

const App = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { siteUser } = useContext(UserContext);
    // const { siteUser, setSiteUser } = useContext(UserContext);

    // const determineLoginState = async () => {
    //     await isAuthenticated;
    //     isAuthenticated && setSiteUser({email: user.email, });
    // };

    // determineLoginState();

    return (
        <BrowserRouter>
            <GlobalStyles />
            {/* Only show if user signed in */}
            {siteUser ? (
                <>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/book" element={<BookPage />} />
                        <Route path="/welcome" element={<LoggedOutWelcome />} />
                        {/* <Route path="/shelf" /> */}
                        {/* <Route path="/friends" />
                        <Route path="/user" /> */}
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                // Redirect to Welcome page if not signed in
                                // Checks against Auth0 rather than siteUser as siteUser is set after the user is redirected to the homepage
                                !isLoading &&
                                (isAuthenticated ? (
                                    <Homepage />
                                ) : (
                                    <Navigate replace to="/welcome" />
                                ))
                            }
                        />
                        <Route path="*" element={<LoggedOutWelcome />} />
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
};

export default App;
