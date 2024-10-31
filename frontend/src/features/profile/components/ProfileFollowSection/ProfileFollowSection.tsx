import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react'
import './ProfileFollowSection.css'
import pfp from '../../../../assets/Generic-Profile.jpg'

interface  ProfileFollowSectionProps{
    profilePicture:string;
    username:string
}

export const ProfileFollowSection:React.FC<ProfileFollowSectionProps> = ({profilePicture,username}) => {
  return (
    <div className='profile-follow-section'>
        <img className='profile-follow-section-pfp' src={profilePicture ? profilePicture : pfp} alt={`${username} pfp`}/>
        <div className='profile-follow-section-left'> 
            <div className='profile-follow-section-more'>
                <MoreHorizIcon sx={{
                    width:"20px",
                    height:"20px"
                }}/>
            </div>
            <button className='profile-follow-section-button'>Follow </button>
        </div>
    </div>
  )
}
