import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// This component goes on the homepage and displays the user's shelves
const CondensedShelf = () => {
    

    return (
        <StyledShelf>
            <h2 class="shelves">My Shelves</h2> 
            <Tabs className="tabs-outer">
                <TabList className="tab-list">
                    <Tab className="tab">Title 1</Tab>
                    <Tab className="tab">Title 2</Tab>
                </TabList>

                <TabPanel className="tab-panel">
                    <h2>content</h2>
                </TabPanel>
                <TabPanel className="tab-panel">
                    <h2>content2</h2>
                </TabPanel>
            </Tabs>
        </StyledShelf>
    );
};

const StyledShelf = styled.div`
    width: 500px;
    height: 500px;
    border: 1px solid black;

    .shelves {
        font-size: 2em;
        padding: 10px;
        margin-bottom: 20px;
    }

    .tabs-outer {
        display: flex;
    }

    .tab-list {
        padding: 10px;
    }

    .tab {
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid black;

        &:hover {
            color: purple;
        }

        &:focus {
            color: green;
        }

        /* not sure if the below necessary */
    .tab-panel {
        display: none;
        
        &:focus {
            display: block;
        }
    }

    }
`;

export default CondensedShelf;
