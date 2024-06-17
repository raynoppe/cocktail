"use client";
import React, { createContext, useState } from 'react';

interface User {
    id: number;
    firstName: string;
    email: string;
}

const AppContext = createContext({
    user: {
        id: 0,
        firstName: "Not logged in",
        email: "",
    } as User,
    setUser: (user: User) => { },
    reloadFolder: "",
    setReloadFolder: (folder: string) => { },
    folderActive: "",
    setFolderActive: (folder: string) => { },
})

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({ id: 0, firstName: "", email: "" });
    const [reloadFolder, setReloadFolder] = useState("");
    const [folderActive, setFolderActive] = useState("");

    const context = {
        user,
        setUser,
        reloadFolder,
        setReloadFolder,
        folderActive,
        setFolderActive,
    }

    return <AppContext.Provider value={context}>

        {children}
    </AppContext.Provider>
}

export default AppContext;