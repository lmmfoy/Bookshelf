import styled from "styled-components";
import LoginButton from "./Login";

const LoggedOutWelcome = () => {
    return (
        <StyledWelcome>
            <div className="welcome">
                <h1>Welcome to Bookshelf</h1>
                <LoginButton/>
            </div>
        </StyledWelcome>
    )
}

const StyledWelcome = styled.div `
    height: 100vh;
    background: black url("images/WelcomeBackground.jpg") no-repeat fixed center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .welcome {
        background-color: white;
        height: 300px;
        width: 500px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;        
        padding: 15px;
    }
`

export default LoggedOutWelcome;