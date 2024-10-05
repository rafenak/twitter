package com.twitter.request;

import com.twitter.models.AppUser;
import com.twitter.models.PollChoice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PollVoteRequest {

    private Integer choiceId;
    private Integer userId;
}
