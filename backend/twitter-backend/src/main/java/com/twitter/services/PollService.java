package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.models.Poll;
import com.twitter.models.PollChoice;
import com.twitter.repositories.PollChoiceRepository;
import com.twitter.repositories.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;
    private final PollChoiceRepository  pollChoiceRepository;

    //Create a poll before it gets attached to the post
    public PollChoice generateChoice(PollChoice pc){
        return pollChoiceRepository.save(pc);
    }

    //create all the poll option before they are attached to the post
    public Poll generatePoll(Poll poll){
       return pollRepository.save(poll);
    }

    // TODO: Update the voteForChoice method to take userID and choiceID
    //Place a vote on a poll
    public Poll voteForChoice(PollChoice choice, AppUser user){
        //update the choice itself
        Set<AppUser> currentVotes = choice.getVotes();
        currentVotes.add(user);
        choice.setVotes(currentVotes);
        pollChoiceRepository.save(choice);

        return pollRepository.findById(choice.getPoll().getPollId()).get();

    }



}
