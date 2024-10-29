import { User } from "../../../utils/GlobalInterfaces";

//Type for the React Context
export type DiscoveryContextType ={
    searchContent:string;
    searchResultsUsers: User[];
    searchForUsers: (searchContent:string) => void,
    updateSearchContent: (content:string) => void
}