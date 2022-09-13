import React from "react";
import { createContext, useContextSelector } from "use-context-selector";


const ActiveRoomContext = createContext();


export const ActiveRoomProvider = ({ children, data }) =>{
    return <ActiveRoomContext.Provider value={data}> { children } </ActiveRoomContext.Provider>
}

export const useActiveRoom = (selector) => useContextSelector(ActiveRoomContext, selector)