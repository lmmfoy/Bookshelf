import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Profile from "./Profile";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <StyledHeader>
            <Link to="/">
                <img
                    className="logo"
                    src="images/logo-white-germanika-1.png"
                    alt="Bookshelf logo"
                />
                {/* <img className="logo" src="images/logo-white-germanika-2.png" alt="Bookshelf logo" /> 
        <img className="logo" src="images/logo-white-kelly-2.png" alt="Bookshelf logo" />
        <img className="logo" src="images/logo-white-kelly-1.png" alt="Bookshelf logo" />
        {/* <img className="logo" src="images/logo-white-king.png" alt="Bookshelf logo" />  */}
            </Link>
            {/* If user is logged in, show welcome + logout button, else show login button */}
            {isAuthenticated ? (
                <div className="header-right">
                    <h2>Welcome back {user.name[0]}</h2>
                    <LogoutButton />
                </div>
            ) : (
                <LoginButton />
            )}
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    height: 150px;
    background-color: var(--color-philippine-bronze);
    background-color: var(--color-brown-brown);
    background-color: var(--color-dark-red);
    background-color: var(--color-coffee-brown);
    background-color: var(--color-american-bronze);

    img {
        height: 120px;
    }
    .logo {
        color: white;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 15px;
        color: white;
    }
`;

export default Header;
