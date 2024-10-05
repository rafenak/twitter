package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.models.Poll;
import com.twitter.models.PollChoice;
import com.twitter.repositories.PollChoiceRepository;
import com.twitter.repositories.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final UserService userService;

    //Create a poll before it gets attached to the post
    public PollChoice generateChoice(PollChoice pc) {
        return pollChoiceRepository.save(pc);
    }

    //create all the poll option before they are attached to the post
    public Poll generatePoll(Poll poll) {
        return pollRepository.save(poll);
    }

    // TODO: Update the voteForChoice method to take userID and choiceID
    //Place a vote on a poll
//    public Poll voteForChoice(Integer choiceId, Integer userId) {
//
//        //get the user
//        AppUser user = userService.getUserById(userId);
//
//        //get the entire poll choice
//        PollChoice pc = pollChoiceRepository.findById(choiceId).orElseThrow();
//        Poll poll = pc.getPoll();
//        List<AppUser> votes = new ArrayList<>();
//
//        poll.getChoices().forEach(choice -> {
//            choice.getVotes().forEach(voteUser ->{
//                votes.add(voteUser);
//            });
//        });
//
//        if(votes.contains(user)) return poll;
//
//        //update the choice itself
//        Set<AppUser> currentVotes = pc.getVotes();
//        currentVotes.add(user);
//        pc.setVotes(currentVotes);
//        pollChoiceRepository.save(pc);
//
//        List<PollChoice> choiceList = poll.getChoices();
//        choiceList.set(poll.getChoices().indexOf(pc),pc);
//
//       // return pollRepository.findById(pc.getPoll().getPollId()).get();
//        return pollRepository.save(poll);
//    }

    public Poll voteForChoice(Integer choiceId, Integer userId) {
        // Get the user
        AppUser user = userService.getUserById(userId);

        // Get the poll choice and the associated poll
        PollChoice pollChoice = pollChoiceRepository.findById(choiceId).orElseThrow();
        Poll poll = pollChoice.getPoll();

        // Check if the user has already voted in the poll
        boolean hasVoted = poll.getChoices().stream()
                .flatMap(choice -> choice.getVotes().stream())
                .anyMatch(voteUser -> voteUser.equals(user));

        if (hasVoted) {
            return poll;
        }

        // Add the user's vote to the selected choice
        pollChoice.getVotes().add(user);
        pollChoiceRepository.save(pollChoice);

        // Save and return the updated poll
        return pollRepository.save(poll);
    }

}
