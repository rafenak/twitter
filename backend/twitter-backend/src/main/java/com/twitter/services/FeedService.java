package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final UserService userService;
    private final PostService postService;

    public List<Post> getFeedForUser(Integer id) {

        AppUser currentUser = userService.getUserById(id);

        //Find the user all the current following list
        Set<AppUser> following = currentUser.getFollowing();

        //find the current user post
        Set<Post> currentUserPosts = postService.getAllPostsByAuthor(currentUser);

        //Find the all the other user posts
        List<Post> followingPosts = postService.getAllPostsByAuthors(following);

        //Concat all the post
        List<Post> allPost =  new ArrayList<>();
        allPost.addAll(currentUserPosts);
        allPost.addAll(followingPosts);

        return allPost;

    }
}
