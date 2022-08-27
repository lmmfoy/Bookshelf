import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/pages/LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "./components/pages/SearchPage";

const App = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <BrowserRouter>
            <GlobalStyles />
            {/* Only show header if user signed in */}
            {isAuthenticated && <Header />}
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
                <Route path="/shelf" />
                <Route path="/friends" />
                <Route
                    path="/search"
                    element={
                        // !isLoading &&
                        // (isAuthenticated ? (
                        //     <SearchPage />
                        // ) : (
                        //     <Navigate replace to="/welcome" />
                        // ))
                        <SearchPage/>
                    }
                />
                <Route path="/welcome" element={<LoggedOutWelcome />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
