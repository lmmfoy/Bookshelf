import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [siteUser, setSiteUser] = useState(null);

    return (
        <UserContext.Provider
            value={{
                siteUser,
                setSiteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
