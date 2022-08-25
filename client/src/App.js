import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import LoggedOutWelcome from "./components/LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";

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
                        isAuthenticated ? (
                            <Homepage />
                        ) : (
                            <Navigate replace to="/welcome" />
                        )
                    }
                />
                <Route path="/shelf" />
                <Route path="/friends" />
                <Route path="/search" />
                <Route path="/welcome" element={<LoggedOutWelcome/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
