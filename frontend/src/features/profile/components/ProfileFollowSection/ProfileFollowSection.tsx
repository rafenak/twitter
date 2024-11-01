import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react'
import './ProfileFollowSection.css'
import pfp from '../../../../assets/Generic-Profile.jpg'
import { AppDisptach, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../../../redux/Slices/UserSlice';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { ImageInfo } from '../../../../utils/GlobalInterfaces';

interface ProfileFollowSectionProps {
  profilePicture: ImageInfo | null;
  username: string
}

export const ProfileFollowSection: React.FC<ProfileFollowSectionProps> = ({ profilePicture, username }) => {

  const token = useSelector((state: RootState) => state.user.token)
  const dispatch: AppDisptach = useDispatch();
  const followingList = useSelector((state: RootState) => state.user.following)
  const [hoveringOverUnFollow, setHoveringOverUnFollow] = useState<boolean>(false);

  const hanldleFollowUser = () => {
    if (token) {
      dispatch(
        followUser({
          token: token,
          followee: username,
        })
      );
    }
  };

  return (
    <div className="profile-follow-section">
      <img
        className="profile-follow-section-pfp"
        src={profilePicture ? profilePicture.imageURL : pfp}
        alt={`${username} pfp`}
      />
      <div className="profile-follow-section-left">
        <div className="profile-follow-section-more">
          <MoreHorizIcon
            sx={{
              width: "18px",
              height: "18px",
            }}
          />
        </div>
        {followingList.find((person) => person.username === username) && (
          <div className="profile-follow-section-more">
            <NotificationAddIcon
              sx={{
                width: "18px",
                height: "18px",
              }}
            />
          </div>
        )}
        {followingList.find((person) => person.username === username) ? (
          <button
            className="profile-follow-section-unfollow-button"
            onMouseEnter={() => setHoveringOverUnFollow(true)}
            onMouseLeave={() => setHoveringOverUnFollow(false)}
          >
            {hoveringOverUnFollow ? "Unfollow" : "Following"}
          </button>
        ) : (
          <button
            className="profile-follow-section-follow-button"
            onClick={hanldleFollowUser}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
