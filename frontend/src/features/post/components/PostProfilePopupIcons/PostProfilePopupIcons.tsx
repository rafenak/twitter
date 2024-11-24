import React from 'react'
import { User } from "../../../../utils/GlobalInterfaces";
import pfp from '../../../../assets/Generic-Profile.webp'
import './PostProfilePopupIcons.css'


interface PostProfilePopupIconsProps{
    followedBy: User[]
}

export const PostProfilePopupIcons:React.FC<PostProfilePopupIconsProps> = ({followedBy}) => {
  return (
    <div className='post-profile-popup-icons'>
        {followedBy.map((user,idx)=>{
            if(user.profilePicture){
                return  <img className="post-profile-popup-icon" 
                    src={user.profilePicture?.imageURL} 
                    alt={`pfp`}
                    style={{
                        left:`${idx * 10}px`
                    }}
                     />
            }
            return <img className="post-profile-popup-icon" 
            src={pfp}
            alt={`pfp`}
            style={{
                left:`${idx * 10}px`
            }}
             />
        })}
    </div>
  )
}
