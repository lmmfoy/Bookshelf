import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <StyledButton
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Sign Out
        </StyledButton>
    );
};

const StyledButton = styled.button`
    font-size: 1em;
    border-radius: 10px;
    box-shadow: none;
    border: 1px solid white;
    background-color: transparent;

    &:hover {
        background-color: var(--color-burnt-orange);
    }
`;
export default LogoutButton;
