import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "./UserContext";


const Notes = ({book}) => {
    const { shelves } = useContext(UserContext);

    return (
        <StyledNotes>
            <div>hi</div>
        </StyledNotes>
    )
}

const StyledNotes = styled.div `

    border: 1px solid;
    width: 400px;

`

export default Notes;