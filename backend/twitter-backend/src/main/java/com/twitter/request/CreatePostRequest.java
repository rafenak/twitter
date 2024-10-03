package com.twitter.request;

import com.twitter.enums.Audience;
import com.twitter.enums.ReplyRestriction;
import com.twitter.models.AppUser;
import com.twitter.models.Image;
import com.twitter.models.Poll;
import com.twitter.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreatePostRequest {
    private String content;
    private AppUser author;
    private Set<Post> replies;
    private List<Image> images;
    private boolean scheduled;
    private Date scheduledDate;
    private Audience audience;
    private ReplyRestriction replyRestriction;
    private Poll poll;
}
