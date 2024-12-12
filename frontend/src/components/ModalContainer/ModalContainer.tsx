import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { FeedPostCreatorImageEditImageModal } from '../../features/feed/components/FeedPostCreatorImageEditImageModal/FeedPostCreatorImageEditImageModal';
import { FeedPostCreatorTagPeopleModal } from '../../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal';
import { FeedPosterGifCreatorModal } from '../../features/feed/components/FeedPostGifCreatorModal/FeedPostGifCreatorModal';
import { SchedulePostModal } from '../../features/schedulepost/components/SchedulePostModal/SchedulePostModal';
import { CreateReply } from '../../features/post/components/CreateReply/CreateReply';

export default function ModalContainer() {
    const displayEditImageModel = useSelector((state: RootState) => state.modal.displayEditPostImage);
    const displayTagPeople = useSelector((state: RootState) => state.modal.displayTagPeople);
    const displayGif = useSelector((state: RootState) => state.modal.displayGif);
    const displaySchedule = useSelector((state: RootState) => state.modal.displaySchedule);
    const displayCreateReply = useSelector((state: RootState) => state.modal.displayCreateReply)

    return (
        <>
            {displayEditImageModel && <FeedPostCreatorImageEditImageModal />}
            {displayTagPeople && <FeedPostCreatorTagPeopleModal />}
            {displayGif && <FeedPosterGifCreatorModal />}
            {displaySchedule && <SchedulePostModal />}
            {displayCreateReply && <CreateReply />}
        </>
    )
}

