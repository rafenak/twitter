package com.twitter.request;

import com.twitter.models.AppUser;
import com.twitter.models.Image;
import com.twitter.models.Poll;
import com.twitter.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateReplyRequest {

    private AppUser author;
    private Integer originalPost;
    private String replyContent;
    private List<Image> images;
    private boolean scheduled;
    private LocalDateTime scheduledDate;
    private Poll poll;

}
