import React, { useRef } from 'react'
import './CreatePostButtonCluster.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { createPoll, updateCurrentPostImages } from '../../../../redux/Slices/PostSlice';
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GifSVG from "../../../../components/SVGs/GifSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import { updateDiplaySchedule, updateDisplayEmojis, updateDisplayGif } from '../../../../redux/Slices/ModalSlice';

interface CreatePostButtonClusterProps {
    location: string,
    type: string
}


export const CreatePostButtonCluster: React.FC<CreatePostButtonClusterProps> = ({ location, type }) => {
    const state = useSelector((state: RootState) => state.post);
    const dispatch: AppDisptach = useDispatch();
    const imageSelectorRef = useRef<HTMLInputElement>(null);
    const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {


        let imageList: File[] = []
        if (location === 'reply') {
            imageList = state.currentReplyImages;
        }
        else if (location === 'post') {
            imageList = state.currentPostImages;
        }

        //const  imageList = state.post.currentPostImages;

        if (imageSelectorRef.current && e.target.files) {
            if (e.target.files.length + imageList.length > 4) {
                console.log("Selected too many files");
                imageSelectorRef.current.value = "";
                return;
            }
            if (imageList[0]?.type === "image/gif") {
                console.log("only one gif and no other images allowed");
                imageSelectorRef.current.value = "";
                return;
            }

            let fileArr: File[] = [...imageList];
            for (let i = 0; i < e.target.files.length; i++) {
                let file = e.target.files.item(i);
                if (
                    (file?.type === "image/gif" && imageList.length > 1) ||
                    (file?.type === "image/gif" && e.target.files.length > 1)
                ) {
                    console.log("only one gif and no other images are allowed");
                    imageSelectorRef.current.value = "";
                    return;
                }
                if (file) fileArr.push(file);
            }
            dispatch(updateCurrentPostImages({
                files: fileArr,
                location: location
            }));
        }
    };

    const determineFull = (): boolean => {

        let length: number = 0;

        let type: string = ''

        if (location === 'reply') {
            length = state.currentReplyImages.length
            type = state.currentReplyImages[0]?.type
        }
        else if (location === 'post') {
            length = state.currentPostImages.length
            type = state.currentPostImages[0]?.type
        }

        if (length === 4) {
            return true;
        }
        if (type === "image/gif") {
            return true;
        }

        if ((state.currentReply && state.currentReply.images.length > 0)
            || (state.currentPost && state.currentPost.images.length > 0)) {
            return true;
        }
        return false;
    };

    const disableGif = () => {
        if (state.currentPostImages.length > 0 ||
            state.currentReplyImages.length > 0 ||
            (state.currentReply && state.currentReply.images.length > 0) ||
            (state.currentPost && state.currentPost.images.length > 0)
        ) { return true; }
        return false;
    }

    const diplayGif = () => {
        dispatch(updateDisplayGif());
    };

    const generatePoll = (e: React.MouseEvent<HTMLDivElement>) => {
        if (state.currentPost || state.currentReply) {
            dispatch(createPoll());
        }
    };

    const openScheduleModal = () => {
        dispatch(updateDiplaySchedule());
    };

    const openEmojiModal = () => {
        dispatch(updateDisplayEmojis());
    };


    return (
        // <>{  (state.post.currentPost || state.post.currentReply) &&
        <div className='create-post-button-cluster'>
            <div>
                <input onChange={handleGetImages} type="file" id="images" accept="image/*" multiple={true}
                    ref={imageSelectorRef} hidden disabled={determineFull()} />
                <label htmlFor="images" className={determineFull() ? "create-post-button-cluster-icon-bg" : 'create-post-button-cluster-icon-bg icon-active'}>
                    <MediaSVG height={20} width={20} color={determineFull() ? "rgba(19,161,242,0.5)" : "#1DA1F2"} />
                </label>
            </div>
            <div className={disableGif() ? "create-post-button-cluster-icon-bg" : "create-post-button-cluster-icon-bg icon-active"} onClick={diplayGif}>
                <GifSVG height={20} width={20} color={state.currentPostImages.length ? "rgba(19,161,242,0.5)" : "#1DA1F2"} />
            </div>
            {type === 'post' &&
                <div className={(state.currentPostImages.length > 0 || state.currentReplyImages.length > 0) ? "create-post-button-cluster-icon-bg" : "create-post-button-cluster-icon-bg icon-active"} onClick={generatePoll} >
                    <PollSVG height={20} width={20} color={(state.currentPostImages.length || state.currentReplyImages.length) ? "rgba(19,161,242,0.5)" : "#1DA1F2"} />
                </div>
            }
            <div className="create-post-button-cluster-icon-bg icon-active" onClick={openEmojiModal}>
                <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            {type === 'post' &&
                <div className="create-post-button-cluster-icon-bg icon-active" onClick={openScheduleModal}>
                    <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
                </div>
            }
            <div className="create-post-button-cluster-icon-location ">
                <LocationSVG
                    height={20}
                    width={20}
                    color={"rgba(29,161,242, 0.5)"}
                />
            </div>
        </div>
        // }
        //</>
    )
}
