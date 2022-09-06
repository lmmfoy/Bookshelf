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
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 100px 0 80px;
    margin-bottom: 50px;
    align-items: center;
    height: 150px;
    background-color: var(--color-brown-brown);
    background-color: var(--color-coffee-brown);
    background-color: var(--color-dark-red);
    background-color: var(--color-american-bronze);
    background-color: var(--color-philippine-bronze);
    border-radius: 10px 10px 0 0;

    img {
        height: 120px;
    }
    .logo {
        color: white;
        margin-top: 5px;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 35px;
        color: white;

    }
`;

export default Header;
