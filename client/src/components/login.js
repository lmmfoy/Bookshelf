import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>
    );
};

const StyledButton = styled.button`
    background-color: var(--color-american-bronze);
`;
export default LoginButton;
