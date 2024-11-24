import React, { useState } from "react";
import { User } from "../../../../utils/GlobalInterfaces";
import NotInterestedSVG from "../../../../components/SVGs/NotInterestedSVG";
import SubscribeSVG from "../../../../components/SVGs/SubscribeSVG";
import UnfollowSVG from "../../../../components/SVGs/UnfollowSVG";
import FollowSVG from "../../../../components/SVGs/FollowSVG";
import ListAddRemoveSVG from "../../../../components/SVGs/ListAddRemoveSVG";
import MuteSVG from "../../../../components/SVGs/MuteSVG";
import BlockSVG from "../../../../components/SVGs/BlockSVG";
import ViewSVG from "../../../../components/SVGs/ViewSVG";
import EmbedVG from "../../../../components/SVGs/EmbedSVG";
import ReportSVG from "../../../../components/SVGs/ReportSVG";
import './PostMoreModal.css'
import { checkFollowing } from "../../../../services/UserService";

interface PostMoreModalProps {
  author: User;
  followingList: User[];
}

export const PostMoreModal: React.FC<PostMoreModalProps> = ({
  author,
  followingList,
}) => {

  const [following,setFollowing] = useState<boolean>(()=> {
    return checkFollowing(followingList,author);
  });

  return (
    <div className="post-more-modal">
      <div className="post-more-modal-option">
        <NotInterestedSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          Not Interested in this post
        </p>
      </div>
      {!following && (
        <div className="post-more-modal-option">
          <SubscribeSVG height={18} width={18}/>
          <p className="post-more-modal-option-text">
            Subscribe to @{author.username}
          </p>
        </div>
      )}
      <div className="post-more-modal-option">
      {following ? <UnfollowSVG height={18} width={18}/> : <FollowSVG height={18} width={18}/>}
        <p className="post-more-modal-option-text">
          {following ? "Unfollow" : "Follow"}  @{author.username}
        </p>
      </div> 
      <div className="post-more-modal-option">
        <ListAddRemoveSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
           Add/Remove @{author.username} from list
        </p>
      </div>
      <div className="post-more-modal-option">
        <MuteSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          Mute  @{author.username}
        </p>
      </div>
      <div className="post-more-modal-option">
        <BlockSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          Block  @{author.username}
        </p>
      </div>
      <div className="post-more-modal-option">
        <ViewSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          View post engagements
        </p>
      </div>
      <div className="post-more-modal-option">
        <EmbedVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          Embed Post
        </p>
      </div>
      <div className="post-more-modal-option">
        <ReportSVG height={18} width={18}/>
        <p className="post-more-modal-option-text">
          Report post 
        </p>
      </div>
    </div>
  );
};
