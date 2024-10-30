import React, { createContext, useState } from "react"
import { DiscoveryContextType } from "./Modal"
import { User } from "../../../utils/GlobalInterfaces";
import axios from "axios";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

export const DiscoveryContext = createContext<DiscoveryContextType | null>(null);

const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const token = useSelector((state:RootState)=>state.user.token)

    const [searchContent, setSearchContent] = useState<string>("");
    const [searchResultsUsers, setSearchResultsUsers] = useState<User[]>([]);     

     


    const searchForUsers = async (searchContent: string) => {
        // Search for the user, wait for two or three seconds
        let req = await axios.get(`http://localhost:8000/discovery/users`,{
            headers:{
                "Authorization": `Bearer ${token}`
            },
            params:{
                "searchTerm":searchContent
            }
        });

        let body = req.data;
        setSearchResultsUsers(body);
    }

    const updateSearchContent = (content:string) => {
        setSearchContent(content);
    } 

 
    return (
        <DiscoveryContext.Provider value={{ searchContent, searchResultsUsers,searchForUsers, updateSearchContent }}>
            {children}
        </DiscoveryContext.Provider>
    )
}

export default DiscoveryProvider;