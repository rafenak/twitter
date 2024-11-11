package com.twitter.request;

import com.twitter.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeedPost {

    private Post post;

    private Post reply;

    private boolean repost;

}
