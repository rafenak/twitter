import {useDispatch, useSelector } from "react-redux";
import { setCurrentPost, updatePost } from "../redux/Slices/FeedSlice";
import { updateDisplayCreateReply } from "../redux/Slices/ModalSlice";
import { bookmarkPost,likePost,repostPost,viewPost } from "../redux/Slices/PostSlice";
import { Post,User } from "../utils/GlobalInterfaces";
import { AppDisptach, RootState } from "../redux/Store";


export function usePostActions(){
    const token = useSelector((state:RootState)=> state.user.token);
    const loggegIn = useSelector((state:RootState)=> state.user.loggedIn);
    const dispatch:AppDisptach = useDispatch();

    const toggleReply = (post:Post) =>{
        dispatch(setCurrentPost(post))
        dispatch(updateDisplayCreateReply())
    }


    const createRepost = (post:Post) => {
        let updatedPost = JSON.parse(JSON.stringify(post))
        if (loggegIn && !post.reposts.some((user) => user.userId === loggegIn.userId)) {
            let reposts = [...post.reposts, loggegIn]
            updatedPost = {
                ...updatedPost,
                reposts
            }
            dispatch(updatePost(updatedPost))
        }
        if (loggegIn && post.reposts.some((user) => user.userId === loggegIn.userId)) {
            let reposts = updatedPost.reposts.filter((user: User) => user.userId !== loggegIn?.userId)
            updatedPost = {
                ...updatedPost,
                reposts
            }
            dispatch(updatePost(updatedPost))
        }

        dispatch(repostPost({
            postId: post.postId,
            token: token
        }))
    }

    const createLike = (post:Post) => {
        let updatedPost = JSON.parse(JSON.stringify(post))
        if (loggegIn && !post.likes.some((user) => user.userId === loggegIn.userId)) {
            let likes = [...post.likes, loggegIn]
            updatedPost = {
                ...updatedPost,
                likes
            }
            dispatch(updatePost(updatedPost))
        }
        if (loggegIn && post.likes.some((user) => user.userId === loggegIn.userId)) {
            let likes = updatedPost.likes.filter((user: User) => user.userId !== loggegIn?.userId)
            updatedPost = {
                ...updatedPost,
                likes
            }
            dispatch(updatePost(updatedPost))
        }


        dispatch(likePost({
            postId: post.postId,
            token: token
        }))
    }


    const createBookmark = (post:Post ) => {

        let updatedPost = JSON.parse(JSON.stringify(post))
        if (loggegIn && !post.bookmarks.some((user) => user.userId === loggegIn.userId)) {
            let bookmarks = [...post.bookmarks, loggegIn]
            updatedPost = {
                ...updatedPost,
                bookmarks
            }
            dispatch(updatePost(updatedPost))
        }
        if (loggegIn && post.bookmarks.some((user) => user.userId === loggegIn.userId)) {
            let bookmarks = updatedPost.bookmarks.filter((user: User) => user.userId !== loggegIn?.userId)
            updatedPost = {
                ...updatedPost,
                bookmarks
            }
            dispatch(updatePost(updatedPost))
        }

        dispatch(bookmarkPost({
            postId: post.postId,
            token: token
        }))
    }

    const createSingleView = (post:Post) =>{
        let updatedPost = JSON.parse(JSON.stringify(post));

        if (loggegIn && !post.views.some((user) => user.userId === loggegIn.userId)) {
            let views = [...post.views, loggegIn]
            updatedPost = {
                ...updatedPost,
                views
            }
            dispatch(updatePost(updatedPost))
        }

        dispatch(viewPost({
            postId: post.postId,
            token: token
        }))
    }

    return {toggleReply,createRepost,createLike,createBookmark,createSingleView }




}