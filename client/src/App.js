import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/pages/LoggedOutWelcome";
import SearchPage from "./components/pages/SearchPage";
import GeneralBookPage from "./components/pages/GeneralBookPage";
import SpecificBookPage from "./components/pages/SpecificBookPage";
import GlobalStyles from "./GlobalStyles";

import { UserContext } from "./components/UserContext";

const App = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { siteUser } = useContext(UserContext);

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
                        <Route
                            path="/book/:isbn"
                            element={<SpecificBookPage />}
                        />
                        <Route path="/book" element={<GeneralBookPage />} />
                        <Route path="/welcome" element={<LoggedOutWelcome />} />
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
