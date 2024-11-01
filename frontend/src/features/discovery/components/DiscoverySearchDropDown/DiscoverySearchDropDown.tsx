import React, { useContext, useEffect } from 'react'
import './DiscoverySearchDropDown.css'
import { DiscoveryContext } from '../../context/DiscoveryContext'
import { DiscoveryContextType } from '../../context/Modal'
import { DiscoverySearchDropDownResult } from '../DiscoverySearchDropDownResult/DiscoverySearchDropDownResult'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'


interface DiscoverySearchDropDownProps {
    toggleDropDown: (value: boolean) => void
}

export const DiscoverySearchDropDown: React.FC<DiscoverySearchDropDownProps> = ({ toggleDropDown }) => {

    const { searchResultsUsers, searchContent, updateSearchContent } = useContext(DiscoveryContext) as DiscoveryContextType;
    const navigate = useNavigate()

    const navigateToUserProfile = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        toggleDropDown(false);
        updateSearchContent('')
        navigate(`${e.currentTarget.id}`)
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
                            return <div className='discovery-search-drop-down-result-wrapper' onClick={navigateToUserProfile}
                                key={user.userId} id={user.username}>
                                <DiscoverySearchDropDownResult pfp={user.profilePicture}
                                    nickname={user.nickname} 
                                    key={user.userId} 
                                    verifiedAccount={user.verifiedAccount}
                                    privateAccount={false} 
                                    organization={user.organization}
                                    username={user.username} />
                            </div>
                        })}
                    </div>
                    <div className='discovery-search-drop-down-go-to'>
                        <p className='discovery-search-drop-down-go-to-text' onClick={navigateToUserProfile} id={searchContent}>
                            Go to @{searchContent}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}
