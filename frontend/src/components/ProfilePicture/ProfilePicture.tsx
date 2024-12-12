import "./ProfilePicture.css";
import { User } from "../../utils/GlobalInterfaces";
import { useNavigate } from "react-router-dom";
import pfp from "../../assets/Generic-Profile.webp";

interface ProfilePictureProps {
  user: User;
  size: string;
}

export default function ProfilePicture(props: ProfilePictureProps) {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${props.user.username}`);
  };

  return (
    <img
      className="profile-picture"
      height={props.size}
      width={props.size}
      src={props.user.profilePicture ? props.user.profilePicture?.imageURL : pfp}
      alt={`${props.user.username}'s profile`}
      onClick={navigateToProfile}
    />
  );
}
