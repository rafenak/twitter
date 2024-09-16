package com.twitter.request;

import com.twitter.enums.Audience;
import com.twitter.enums.ReplyRestriction;
import com.twitter.models.AppUser;
import com.twitter.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreatePostRequest {
    private String content;
    private AppUser author;
    Set<Post> replies;
    private boolean scheduled;
    private Date scheduledDate;
    private Audience audience;
    private ReplyRestriction replyRestriction;
}
