import React, { useContext, useEffect } from 'react'
import './DiscoverySearchDropDown.css'
import { DiscoveryContext } from '../../context/DiscoveryContext'
import { DiscoveryContextType } from '../../context/Modal'
import { DiscoverySearchDropDownResult } from '../DiscoverySearchDropDownResult/DiscoverySearchDropDownResult'
import SearchIcon from '@mui/icons-material/Search'


interface DiscoverySearchDropDownProps{
 toggleDropDown: (value: boolean) => void
}

export const DiscoverySearchDropDown: React.FC<DiscoverySearchDropDownProps>  = ({toggleDropDown }) => {

    const { searchResultsUsers, searchContent } = useContext(DiscoveryContext) as DiscoveryContextType;

    const navigateToUserProfile = (e:React.MouseEvent<HTMLDivElement>) =>{
        toggleDropDown(false)
    }

    useEffect(() => { 

    }, [searchResultsUsers])

    return (
        <div className='discovery-search-drop-down'>
            <div className='discovery-search-drop-down-serach-for'>
                {searchContent ?
                    <div className='discovery-search-drop-down-content-wrapper' onClick={() => {/*Naviate to search */ }}>
                        <SearchIcon sx={{
                            width: "30px",
                            height: "30px"
                        }} />
                        <p className='discovery-search-drop-down-content'>{searchContent}</p>
                    </div>
                    :
                    <div className='discovery-search-drop-down-empty-wrapper'>
                        <p className='discovery-search-drop-down-empty'> Trying seraching for people, lists, or keywords</p>
                    </div>

                }
            </div>
            {
                searchContent &&
                <div className='discovery-search-drop-down-results'>
                    <div>
                        {searchResultsUsers.slice(0, 8).map((user) => {
                            return <div className='discovery-search-drop-down-result-wrapper' onClick={navigateToUserProfile}>
                                <DiscoverySearchDropDownResult pfp={user.profilePicture}
                                    nickname={user.nickname} key={user.userId} verifiedAccount={false} privateAccount={false} organization={""}
                                    username={user.username} />
                            </div>
                        })}
                    </div>
                    <div className='discovery-search-drop-down-go-to'>
                        <p className='discovery-search-drop-down-go-to-text'>
                            Go to @{searchContent}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}
