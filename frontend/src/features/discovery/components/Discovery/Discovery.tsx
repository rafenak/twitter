import React from "react";
import DiscoveryProvider from "../../context/DiscoveryContext";
import { DiscoverySearchBar } from "../DiscoverySearchBar/DiscoverySearchBar";
import { DiscoverySearchDropDown } from "../DiscoverySearchDropDown/DiscoverySearchDropDown";
import './Discovery.css'

//Wrapping the Context on the discovery page
export const Discovery: React.FC = () => {
    return (
        <DiscoveryProvider>
        <div className="discovery">
            <div className="discovery-sticky">
                <DiscoverySearchBar />
                <DiscoverySearchDropDown/>
            </div>
        </div>
        </DiscoveryProvider>
    )
}
