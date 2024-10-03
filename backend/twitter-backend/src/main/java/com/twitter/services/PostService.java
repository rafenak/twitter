package com.twitter.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.twitter.exceptions.PostDoesNotExistsException;
import com.twitter.exceptions.UnableToCreatePostException;
import com.twitter.models.*;
import com.twitter.repositories.PostRepository;
import com.twitter.request.CreatePostRequest;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Pool;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final ImageService imageService;
    private final PollService   pollService;

    public Post createPost(CreatePostRequest request) {

        Image savedGif;

        //if true, there will a single gif from tenor
        if(request.getImages() !=null && request.getImages().size() > 0){
            List<Image> gifList = request.getImages();
            Image gif =  gifList.getFirst();
            gif.setImagePath(gif.getImageURL());

            savedGif = imageService.saveGifFromPost(gif);
            gifList.removeFirst();
            gifList.add((savedGif));
            request.setImages(gifList);
        }

        //if true, there is a poll needs to be created
        Poll savedPoll = null;
        if(request.getPoll() != null){
            Poll p = new Poll();
            p.setEndTime(request.getPoll().getEndTime());
            p.setChoices(new ArrayList<>());
            savedPoll = pollService.generatePoll(p);
            List<PollChoice> pollChoices =new ArrayList<PollChoice>();
            List<PollChoice> choices = request.getPoll().getChoices();
            for (int i = 0; i < choices.size(); i++) {
                PollChoice choice = choices.get(i);
                choice.setPoll(savedPoll);
                choice=pollService.generateChoice(choice);
                pollChoices.add(choice);
            }
            savedPoll.setChoices(pollChoices);
            savedPoll = pollService.generatePoll(savedPoll);
        }


        Post p = new Post();
        p.setContent(request.getContent());

        if (request.isScheduled()) {
            p.setPostDate(p.getScheduledDate());
        } else {
            p.setPostDate(new Date());
        }
        p.setAuthor(request.getAuthor());
        p.setReplies(request.getReplies());
        p.setScheduled(request.isScheduled());
        p.setScheduledDate(request.getScheduledDate());
        p.setAudience(request.getAudience());
        p.setReplyRestriction(request.getReplyRestriction());
        p.setImages(request.getImages());
        p.setPoll(savedPoll);

        try {
            return postRepository.save(p);
        } catch (Exception e) {
           throw  new UnableToCreatePostException();
        }
    }

    public Post createMediaPost(String post, List<MultipartFile> files){
        CreatePostRequest request = new CreatePostRequest();

        try{

            ObjectMapper objectMapper = new ObjectMapper();
            request = objectMapper.readValue(post, CreatePostRequest.class);

            Post p = new Post();
            p.setContent(request.getContent());

            if (request.isScheduled()) {
                p.setPostDate(p.getScheduledDate());
            } else {
                p.setPostDate(new Date());
            }
            p.setAuthor(request.getAuthor());
            p.setReplies(request.getReplies());
            p.setScheduled(request.isScheduled());
            p.setScheduledDate(request.getScheduledDate());
            p.setAudience(request.getAudience());
            p.setReplyRestriction(request.getReplyRestriction());

            //upload the images that got passed
            List<Image> postImages = new ArrayList<>();
            for (int i = 0; i < files.size(); i++) {
               Image postImage= imageService.uploadImage(files.get(i),"post");
               postImages.add(postImage);
            }
            p.setImages(postImages);
            return  postRepository.save(p);
        }
        catch (Exception e) {
            throw  new UnableToCreatePostException();
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer id) {
        return postRepository.findById(id).orElseThrow(PostDoesNotExistsException::new);
    }

    public Set<Post> getAllPostsByAuthor(AppUser author) {
        return postRepository.findByAuthor(author).orElse(new HashSet<>());
    }

    public  void deletePost(Post post){
        postRepository.delete(post);
    }

}
