import { User } from "../../../utils/GlobalInterfaces";

export type DiscoveryContextType ={
    searchContent:string;
    searchResultsUsers: User[];
    searchForUsers: (searchContent:string) => void,
    updateSearchContent: (content:string) => void
}