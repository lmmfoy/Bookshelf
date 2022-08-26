import NewBookSearch from "../NewBookSearch";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Homepage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div>
            {/* <form>
                <label for="author">Author:
                    <input type="text" id="author" name="author" />
                </label>
                <label for="title">Title:
                    <input type="text" id="title" name="title"/>
                </label>
            </form> */}
            <NewBookSearch/>
        </div>
    );
};

export default Homepage;
