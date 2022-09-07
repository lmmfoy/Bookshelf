import styled from "styled-components";

import LoginButton from "../Login";

// This page displayed before user logs in/after they log out
const LoggedOutWelcome = () => {
    return (
        <StyledWelcome>
            <div className="welcome">
                <h1>Welcome to </h1>
                <img
                    className="logo"
                    src="images/logo-green.png"
                    alt="Bookshelf logo"
                />
                <p>Your internet library</p>
                <LoginButton />
            </div>
        </StyledWelcome>
    );
};

const StyledWelcome = styled.div`
    height: 100vh;
    background: black url("images/WelcomeBackground.jpg") no-repeat fixed center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #233e22;

    .welcome {
        background-color: var(--color-beige);
        height: 350px;
        width: 500px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 15px;

        h1 {
            text-align: center;
            font-size: 1.7em;
        }
        img {
            width: 300px;
        }
        p {
            margin: 0 0 10px 0;
        }
        button {
            width: 150px;
            background-color: #233e22;

            &:hover {
                background-color: var(--color-american-bronze);
            }
        }
    }
`;

export default LoggedOutWelcome;
