import React,{useContext, useEffect} from 'react'
import './DiscoverySearchDropDown.css'
import { DiscoveryContext } from '../../context/DiscoveryContext'
import { DiscoveryContextType } from '../../context/Modal'
import { DiscoverySearchDropDownResult } from '../DiscoverySearchDropDownResult/DiscoverySearchDropDownResult'


export const DiscoverySearchDropDown:React.FC = () => {

    const {searchResultsUsers,searchContent} = useContext(DiscoveryContext) as  DiscoveryContextType;  

    useEffect(()=>{

    },[searchResultsUsers])

  return (
    <div className='discovery-search-drop-down'>
        <div className='discovery-search-drop-down-serach-for'>
            {   searchContent ? <p className='discovery-search-drop-down-content'>Search for "{searchContent}"</p> : 
                    <p className='discovery-search-drop-down-empty'> Trying seraching for people, lists,or keywords</p>
            }
        </div>
        {
            searchContent &&
            <div className='discovery-search-drop-down-results'>
                <div className='discovery-search-drop-down-results-list'>
                    {searchResultsUsers.slice(0,8).map((user)=>{
                        return <DiscoverySearchDropDownResult pfp={user.profilePicture} 
                        nickname={user.nickname}  key={user.userId} verifiedAccount={false} privateAccount={false} organization={""}
                        username={user.username}/>
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
