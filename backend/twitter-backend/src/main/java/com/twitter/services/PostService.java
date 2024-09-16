package com.twitter.services;


import com.twitter.exceptions.PostDoesNotExistsException;
import com.twitter.exceptions.UnableToCreatePostException;
import com.twitter.models.AppUser;
import com.twitter.models.Post;
import com.twitter.repositories.PostRepository;
import com.twitter.request.CreatePostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(CreatePostRequest request) {
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

        try {
            return postRepository.save(p);
        } catch (Exception e) {

           throw  new UnableToCreatePostException();
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer id) {
        //TODO: Setup a custom exception
        return postRepository.findById(id).orElseThrow(PostDoesNotExistsException::new);
    }

    public Set<Post> getAllPostsByAuthor(AppUser author) {
        Set<Post> userPosts = postRepository.findByAuthor(author).orElse(new HashSet<>());
        return userPosts;
    }

    public  void deletePost(Post post){
        postRepository.delete(post);
    }

}
