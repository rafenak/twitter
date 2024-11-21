import React from 'react'
import { User } from '../../../../utils/GlobalInterfaces'
import pfp from '../../../../assets/Generic-Profile.webp'
import VerifiedIcon from '@mui/icons-material/Verified';
import './PostProfilePopup.css'

interface PostProfilePopupProps {
    author: User,
    following: User[],
    followers: User[]
}

export const PostProfilePopup: React.FC<PostProfilePopupProps> = ({ author, followers, following }) => {
    return (
        <div className='post-profile-popup'>
            <div className='post-profile-top'>
                <img className="post-profile-pfp"
                    src={author.profilePicture ? author.profilePicture?.imageURL : pfp}
                    alt={`${author.username}'s pfp`} />
                <button className='post-profile-following-btn'>{/* determine wheter user is following or not*/}Following</button>
            </div>
            <div className='post-profile-nickname-bar'>
                <p className='post-profile-nickname'>{author.nickname}</p>
                {author.verifiedAccount && <VerifiedIcon sx={{
                    color: '#1DA1F2',
                    height: '20px',
                    width: '20px'
                }} />}

                {author.organization && <img className='post-profile-oragnization'
                    src={author.organization.imageURL} alt={`${author.username}'s organization`} />}
            </div>
            <p className='post-profile-username'>@{author.username}</p>
            <p className='post-profile-bio'>{author.bio}</p>
            <div className='post-profile-following-followers'>
                <p className='post-profile-following-followers-text'>
                    <span className='post-profile-count'>{following.length}</span>
                    {" "}Following
                </p>
                <p className='post-profile-following-followers-text'>
                    <span className='post-profile-count'>{followers.length}</span>
                    {" "}Followers
                </p>
            </div>
            <div className='post-profile-followed-by-container'>
                <div className='post-profile-followed-by-pfps'>{/*how to stack up to three pfps*/}</div>
                <p className='post-profile-followed-by-users'>Followed by ... {/* map to get 3 username */}</p>
            </div>
        </div>
    )
}
