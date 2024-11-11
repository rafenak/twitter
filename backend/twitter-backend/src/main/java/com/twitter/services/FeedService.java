package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final UserService userService;
    private final PostService postService;

    public List<Post> getFeedForUser(Integer id, LocalDateTime sessionStart,Integer page) {

        AppUser currentUser = userService.getUserById(id);

        //Find the user all the current following list
        Set<AppUser> following = currentUser.getFollowing();
        following.add(currentUser);

//        //find the current user post
//        Set<Post> currentUserPosts = postService.getAllPostsByAuthor(currentUser);


        //Find the all the other user posts
        Page<Post> followingPosts = postService.getAllPostsByAuthors(following,sessionStart,page);

        //Map a new DTO to from feed items class

        //Concat all the post
//        List<Post> allPost =  new ArrayList<>();
//        allPost.addAll(currentUserPosts);
//        allPost.addAll(followingPosts);

        return followingPosts.getContent();

    }
}
