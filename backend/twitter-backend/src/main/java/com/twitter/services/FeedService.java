package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.models.Post;
import com.twitter.response.FeedPostResponse;
import com.twitter.response.FetchFeedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final UserService userService;
    private final PostService postService;

    public FetchFeedResponse  getFeedForUser(Integer id, LocalDateTime sessionStart, Integer page) {

        AppUser currentUser = userService.getUserById(id);

        //Find the user all the current following list
        Set<AppUser> following = currentUser.getFollowing();
        following.add(currentUser);

//        //find the current user post
//        Set<Post> currentUserPosts = postService.getAllPostsByAuthor(currentUser);


        //Find the all the other user posts
        Page<Post> followingPosts = postService.getFeedPage(id, sessionStart, page);

        List<FeedPostResponse> feedPostResponse = followingPosts.map(post -> {
            FeedPostResponse response = new FeedPostResponse();
            response.setPost(post);
//            request.setReply(post.getReply() ? postService.getPostById(post.getPostId()) : null);
            response.setReplyTo((post.getReply() != null && post.getReply()) ? postService.getPostById(post.getReplyTo()) : null);
            response.setRepost(!post.getAuthor().getFollowers().contains(userService.getUserById(id))
                    && !post.getAuthor().equals(userService.getUserById(id)));
            response.setRepostUser(response.isRepost() ?
                    post.getReposts().stream().
                            filter(
                                    user -> userService.getUserById(id).getFollowing().contains(user)
                            ).findFirst().orElse(null) : null);
            return response;
        }).toList();

        //Map a new DTO to from feed items class

        //Concat all the post
//        List<Post> allPost =  new ArrayList<>();
//        allPost.addAll(currentUserPosts);
//        allPost.addAll(followingPosts);

        return new FetchFeedResponse(page,sessionStart,feedPostResponse);

    }
}
