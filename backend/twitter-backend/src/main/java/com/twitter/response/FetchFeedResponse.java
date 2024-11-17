package com.twitter.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FetchFeedResponse {

    private Integer page;
    private LocalDateTime sessionStart;
    private List<FeedPostResponse> posts;

}
