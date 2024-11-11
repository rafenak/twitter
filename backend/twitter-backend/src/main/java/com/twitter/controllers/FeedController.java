package com.twitter.controllers;

import com.twitter.models.Post;
import com.twitter.request.FeedRequest;
import com.twitter.services.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping
    public List<Post> getPostsForFeed(@RequestBody FeedRequest feedRequest) {

        List<Post> feedPost = feedService
                    .getFeedForUser(feedRequest.getUserId(),feedRequest.getSessionStart(),feedRequest.getPage());
        //Collections.sort(feedPost);
        return feedPost;
    }
}
