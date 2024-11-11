package com.twitter.response;

import com.twitter.models.AppUser;
import com.twitter.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeedPostResponse {

    private Post post;

    private Post replyTo;

    private boolean repost;

    private AppUser repostUser;

}
