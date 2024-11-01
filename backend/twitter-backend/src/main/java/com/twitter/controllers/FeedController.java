package com.twitter.controllers;

import com.twitter.models.Post;
import com.twitter.services.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/{id}")
    public List<Post> getPostsForFeed(@PathVariable("id") Integer userId) {

        List<Post> feedPost = feedService.getFeedForUser(userId);
        Collections.sort(feedPost);
        return feedPost;
    }
}
