import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Profile.css'
import { Post, User } from '../utils/GlobalInterfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/Store'
import { ProfileTopBar } from '../features/profile'
import { ProfileFollowSection } from '../features/profile/components/ProfileFollowSection/ProfileFollowSection'


export const Profile: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.token)
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState<User | undefined>();
    const [posts, setPosts] = useState<Post[]>([])

    const fetchProfileUser = async () => {
        let user;
        try {
            let req = await axios.get(`http://localhost:8000/user/${username}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            user = req.data
            // user.bannerPicture ='https://cdn.pixabay.com/photo/2016/09/01/19/53/pocket-watch-1637396_1280.jpg'
            setProfileUser(user)
        } catch (e) {
            console.log('user does not exists,or issue loading');
        }
        finally {
            await fetchUserPosts(user);
        }

    }

    const fetchUserPosts = async (user: User) => {
        try {
            let req = await axios.get(`http://localhost:8000/posts/author/${user.userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setPosts(req.data)
        }
        catch (e) {
            console.log('unable to fetch post');
        }
    }

    useEffect(() => {
        if (token) {
            fetchProfileUser()
        }
    }, [username])

    return (
        <div className='profile'>
            {
                profileUser ? <>
                    <ProfileTopBar nickname={profileUser.nickname} isVerified={true} organization={''} numberOfPosts={posts.length}
                     key={profileUser.userId}/>
                    <div className='profile-banner-picture' 
                    style={profileUser.bannerPicture ? { backgroundImage : `url("${profileUser.bannerPicture}")`} : 
                        {backgroundColor: "#AAB8C2"}}>
                    </div>
                    <ProfileFollowSection profilePicture={profileUser.profilePicture} username={profileUser.username}/>
                </> : <></> 
            }

        </div>
    )
}
