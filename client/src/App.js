import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import Profile from "./components/profile";

const App = () => {
    return (
        <div>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
            <Profile></Profile>
        </div>
    );
};

export default App;
