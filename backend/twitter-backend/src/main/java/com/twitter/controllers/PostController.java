package com.twitter.controllers;

import com.twitter.exceptions.FollowException;
import com.twitter.exceptions.PostDoesNotExistsException;
import com.twitter.exceptions.UnableToCreatePostException;
import com.twitter.models.AppUser;
import com.twitter.models.Post;
import com.twitter.request.CreatePostRequest;
import com.twitter.services.PostService;
import jakarta.mail.Multipart;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
//@CrossOrigin("*")
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/")
     public List<Post> getAllPosts(){
       return postService.getAllPosts();
    }

    @ExceptionHandler({UnableToCreatePostException.class})
    public ResponseEntity<String> handleUnableToCreatePost() {
        return new ResponseEntity<String>("User to create a post at this time",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/")
    public Post createPost(@RequestBody CreatePostRequest request){
        return postService.createPost(request);
    }

    @PostMapping(value = "/media",consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public Post createMediaPost(@RequestPart("post") String post, @RequestPart("media")List<MultipartFile> files){
        return  postService.createMediaPost(post,files);
    }

    @ExceptionHandler({PostDoesNotExistsException.class})
    public ResponseEntity<String> handlePostDoesNotExistsException() {
        return new ResponseEntity<String>("Post does not exits",
                HttpStatus.NOT_FOUND);
    }

    @GetMapping("/id/{id}")
    public Post getPostById(@PathVariable("id") int id){
        return  postService.getPostById(id);
    }

    @GetMapping("/author/{userId}")
    public Set<Post> getPostsByAuthor(@PathVariable("userId") int id){
        AppUser author = new AppUser();
        author.setUserId(id);
        return  postService.getAllPostsByAuthor(author);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deletePost(@RequestBody Post post) {
        postService.deletePost(post);
        return new ResponseEntity<String>("Post has been deleted", HttpStatus.OK);
    }
}
