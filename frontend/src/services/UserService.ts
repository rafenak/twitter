import axios from "axios";
import { User } from "../utils/GlobalInterfaces";

export async function getFollowers(username: string) {
    try {
      const req = await axios.get(
        `http://localhost:8000/user/followers/${username}`
      );
      return req.data;
    } catch (e) {
      return [];
    }
  }
  
  export async function getFollowing(username: string) {
    try {
      const req = await axios.get(
        `http://localhost:8000/user/following/${username}`
      );
      return req.data;
    } catch (e) {
      return [];
    }
  }

export const checkFollowing = (followingList:User[],currentUser:User)=>{
    return followingList.some((user)=> user.userId === currentUser.userId)
} 