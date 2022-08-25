import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles/>
            <Routes>
                <Route path="/" />
                <Route path="/shelf" />
                <Route path="/friends" />
                <Route path="/search" />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
