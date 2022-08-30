import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [siteUser, setSiteUser] = useState(null);
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
