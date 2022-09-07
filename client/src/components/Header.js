import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import LoginButton from "./Login";
import LogoutButton from "./Logout";

const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <StyledHeader>
            <div className="header-flex">
                <Link to="/">
                <img className="logo" src="images/logo.png" alt="Bookshelf logo" />
                </Link>
                {/* If user is logged in, show welcome + logout button, else show login button */}
                {isAuthenticated ? (
                    <div className="header-right">
                        <h2>Welcome back {user.nickname}</h2>
                        <LogoutButton />
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    width: 100%;
    background-color: var(--color-philippine-bronze);
    margin-bottom: 90px;

    .header-flex {
        display: flex;
        height: 180px;
        justify-content: space-between;
        padding: 0 100px 0 80px;
        align-items: center;
        max-width: 2100px;
        border-radius: 10px 10px 0 0;
        margin: 0 auto 50px auto;

    }
    img {
        height: 150x;
    }
    .logo {
        color: var(--color-beige);
        margin-top: 5px;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 35px;
        color: var(--color-beige);
    }
`;

export default Header;
