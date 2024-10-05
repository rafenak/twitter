package com.twitter.controllers;

import com.twitter.models.Poll;
import com.twitter.request.PollVoteRequest;
import com.twitter.services.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/poll")
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;

    @PutMapping("/vote")
    public Poll caseVote(@RequestBody PollVoteRequest request){
        return pollService.voteForChoice(request.getChoiceId(),request.getUserId());
    }

}
