import LoggedOutWelcome from "../LoggedOutWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const Homepage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div>

        </div>
    )
}

export default Homepage;