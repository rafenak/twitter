import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { convertNumberPostsToString } from '../../utils/ProfileUtils';
import './ProfileTopBar.css'


interface ProfileTopBarProps {
  nickname: string;
  isVerified: boolean;
  organization: string;
  numberOfPosts: number;
}

export const ProfileTopBar: React.FC<ProfileTopBarProps> = ({ nickname, isVerified, organization, numberOfPosts }) => {
  return (
    <div className='profile-top-bar'>
      <div className='profile-top-bar-left'>
        <ArrowBackIcon sx={{
          height: '20px',
          width: '20px'
        }} />

      </div>
      <div className='profile-top-bar-right'>
        <div className='profile-top-bar-name-section'>
          <p className='profile-top-bar-name'>
            {nickname}
          </p>
          {isVerified && <VerifiedIcon sx={{
            color: '#1DA1F2',
            height: '20px',
            width: '20px'
          }} />}
          {organization && <img src={organization} alt={`${nickname}'s organization`} height={20} width={20} />}
        </div>
        <p className='profile-top-bar-posts'>
          {convertNumberPostsToString(numberOfPosts)} posts
        </p>
      </div>
    </div>
  )
}
