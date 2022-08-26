import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Profile from "./Profile";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <StyledHeader>
            <h1 className="logo">BOOKSHELF</h1>
            {/* If user is logged in, show welcome + logout button, else show login button */}
            {isAuthenticated ? (
                <div className="header-right">
                    <h2>Welcome back {user.name[0]}</h2>
                    <LogoutButton/>
                </div>
            ):(
                <LoginButton/>
            )}
        </StyledHeader>
    )
};

const StyledHeader = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;

    .header-right {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`

export default Header;