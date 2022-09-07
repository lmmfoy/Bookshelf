import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    // Keeping track of user information
    const [siteUser, setSiteUser] = useState(null);
    // Keeping track of user's shelves
    const [shelves, setShelves] = useState([]);

    return (
        <UserContext.Provider
            value={{
                siteUser,
                setSiteUser,
                shelves,
                setShelves,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
