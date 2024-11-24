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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final UserService userService;
    private final PostService postService;

    public FetchFeedResponse getFeedForUser(Integer id, LocalDateTime sessionStart, Integer page) {

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
//            System.out.println("Followers list");
//            post.getAuthor().getFollowers().stream().map(u -> u.getUserId()).
//                    forEach(System.out::println);
//            System.out.println("currentUser" + userService.getUserById(id).getUserId());
//            System.out.println("Post Author " + post.getAuthor().getUserId());
//            System.out.println("Reposts: " + post.getReposts().stream().map(u -> u.getUserId()).collect(Collectors.toList()));


            response.setReplyTo((post.getReply() != null && post.getReply()) ? postService.getPostById(post.getReplyTo()) : null);
//            response.setRepost(!post.getAuthor().getFollowers().contains(userService.getUserById(id))
//                    && !post.getAuthor().equals(userService.getUserById(id)));
//            response.setRepostUser(response.isRepost() ?
//                    post.getReposts().stream().
//                            filter(
//                                    user -> userService.getUserById(id).getFollowing().contains(user)
//                            ).findFirst().orElse(null) : null);


            // Set repost to true if the current user is in the repost list
            response.setRepost(post.getReposts().stream()
                    .anyMatch(user -> user.getUserId().equals(userService.getUserById(id).getUserId())));

            // Set the repost user to the first user who reposted (if any)
            response.setRepostUser(post.getReposts().stream()
                    .findFirst()  // Get the first user who reposted
                    .orElse(null));


//// Debugging output
//            System.out.println("Post Author ID: " + post.getAuthor().getUserId());
//            System.out.println("Repost list contains currentUser (ID: " + userService.getUserById(id).getUserId() + "): " + response.isRepost());
//            System.out.println("Repost User: " + (response.getRepostUser() != null ? response.getRepostUser().getUserId() : "null"));
            return response;
        }).toList();

        return new FetchFeedResponse(page, sessionStart, feedPostResponse);

    }
}
