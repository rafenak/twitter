package com.twitter.controllers;

import com.twitter.response.FeedPostResponse;
import com.twitter.request.FeedPostRequest;
import com.twitter.services.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping
    public List<FeedPostResponse> getPostsForFeed(@RequestBody FeedPostRequest feedRequest) {
        List<FeedPostResponse> feedResponse = feedService.getFeedForUser(feedRequest.getUserId(),feedRequest.getSessionStart(),feedRequest.getPage());
        //Collections.sort(feedPost);
        return feedResponse;
    }
}
