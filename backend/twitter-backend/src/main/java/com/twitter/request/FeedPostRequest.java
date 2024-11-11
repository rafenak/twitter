package com.twitter.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeedPostRequest {
    private  Integer userId;

    private LocalDateTime sessionStart;

    private  Integer page;
}
