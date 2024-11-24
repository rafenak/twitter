package com.twitter.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.twitter.enums.Audience;
import com.twitter.enums.ReplyRestriction;
import com.twitter.exceptions.PostDoesNotExistsException;
import com.twitter.exceptions.UnableToCreatePostException;
import com.twitter.models.*;
import com.twitter.repositories.PostRepository;
import com.twitter.request.CreatePostRequest;
import com.twitter.request.CreateReplyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final ImageService imageService;
    private final PollService pollService;
    private final TokenService tokenService;
    private final UserService userService;
    private final NotificationService notificationService;

    public Post createPost(CreatePostRequest request) {

        Image savedGif;

        //if true, there will a single gif from tenor
        if (request.getImages() != null && request.getImages().size() > 0) {
            List<Image> gifList = request.getImages();
            Image gif = gifList.getFirst();
            gif.setImagePath(gif.getImageURL());

            savedGif = imageService.saveGifFromPost(gif);
            gifList.removeFirst();
            gifList.add((savedGif));
            request.setImages(gifList);
        }

        //if true, there is a poll needs to be created
        Poll savedPoll = null;
        if (request.getPoll() != null) {
            Poll p = new Poll();
            p.setEndTime(request.getPoll().getEndTime());
            p.setChoices(new ArrayList<>());
            savedPoll = pollService.generatePoll(p);
            List<PollChoice> pollChoices = new ArrayList<PollChoice>();
            List<PollChoice> choices = request.getPoll().getChoices();
            for (int i = 0; i < choices.size(); i++) {
                PollChoice choice = choices.get(i);
                choice.setPoll(savedPoll);
                choice = pollService.generateChoice(choice);
                pollChoices.add(choice);
            }
            savedPoll.setChoices(pollChoices);
            savedPoll = pollService.generatePoll(savedPoll);
        }


        Post p = new Post();
        p.setContent(request.getContent());

        if (request.isScheduled()) {
            p.setPostDate(request.getScheduledDate());
        } else {
            p.setPostDate(LocalDateTime.now());
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
            Post posted = postRepository.save(p);
            notificationService.createAndSendPostNotification(posted);
            return posted;
        } catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }

    public Post createMediaPost(String post, List<MultipartFile> files) {
        CreatePostRequest request = new CreatePostRequest();

        try {

            ObjectMapper objectMapper = new ObjectMapper();
            request = objectMapper.readValue(post, CreatePostRequest.class);

            Post p = new Post();
            p.setContent(request.getContent());

            if (request.isScheduled()) {
                p.setPostDate(request.getScheduledDate());
            } else {
                p.setPostDate(LocalDateTime.now());
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
                Image postImage = imageService.uploadImage(files.get(i), "post");
                postImages.add(postImage);
            }
            p.setImages(postImages);
            return postRepository.save(p);
        } catch (Exception e) {
            throw new UnableToCreatePostException();
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

//    public Page<Post> getAllPostsByAuthors(Set<AppUser> authors, LocalDateTime sessionStart, Integer page) {
//        //Get the next 50 post starting pn page specified in the request
//        Pageable pageable = PageRequest.of(page,50, Sort.by("postDate").descending());
//        return postRepository.findFeedPost (authors,sessionStart,pageable);
//    }

    public Page<Post> getFeedPage(Integer userId,LocalDateTime sessionStart,Integer page){
        Pageable pageable = PageRequest.of(page,100);
        return postRepository.findFeedPost (userId,sessionStart,pageable);
    }

    public void deletePost(Post post) {
        postRepository.delete(post);
    }


    public Post createReply(CreateReplyRequest request) {

        CreatePostRequest postRequest = new CreatePostRequest();
        postRequest.setContent(request.getReplyContent());
        postRequest.setAuthor(request.getAuthor());
        postRequest.setReplies(new HashSet<>());
        postRequest.setImages(request.getImages());
        postRequest.setScheduled(request.isScheduled());
        postRequest.setScheduledDate(request.getScheduledDate());
        postRequest.setAudience(Audience.EVERYONE);
        postRequest.setReplyRestriction(ReplyRestriction.EVERYONE);
        postRequest.setPoll(request.getPoll());

        Post reply = createPost(postRequest);
        reply.setReply(true);
        reply.setReplyTo(request.getOriginalPost());

        Post original = postRepository.findById(request.getOriginalPost())
                .orElseThrow(PostDoesNotExistsException::new);

        Set<Post> originalPostReplies = original.getReplies();
        originalPostReplies.add(reply);
        original.setReplies(originalPostReplies);

        postRepository.save(original);

        return postRepository.save(reply);
    }


    public Post createReplyWithMedia(String reply, List<MultipartFile> files ) {
        CreateReplyRequest replyRequest = new CreateReplyRequest();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            replyRequest = objectMapper.readValue(reply,CreateReplyRequest.class);

            CreatePostRequest postRequest = new CreatePostRequest();
            postRequest.setContent(replyRequest.getReplyContent());
            postRequest.setAuthor(replyRequest.getAuthor());
            postRequest.setReplies(new HashSet<>());
            postRequest.setImages(replyRequest.getImages());
            postRequest.setScheduled(replyRequest.isScheduled());
            postRequest.setScheduledDate(replyRequest.getScheduledDate());
            postRequest.setAudience(Audience.EVERYONE);
            postRequest.setReplyRestriction(ReplyRestriction.EVERYONE);
            postRequest.setPoll(replyRequest.getPoll());


            Post replyPost = createPost(postRequest);
            replyPost.setReply(true);
            replyPost.setReplyTo(replyRequest.getOriginalPost());


            Post original = postRepository.findById(replyRequest.getOriginalPost())
                    .orElseThrow(PostDoesNotExistsException::new);

            Set<Post> originalPostReplies = original.getReplies();
            originalPostReplies.add(replyPost);
            original.setReplies(originalPostReplies);

            postRepository.save(original);

            //upload the images that got passed
            List<Image> postImages = new ArrayList<>();
            for (int i = 0; i < files.size(); i++) {
                Image postImage = imageService.uploadImage(files.get(i), "reply");
                postImages.add(postImage);
            }
            replyPost.setImages(postImages);

           return postRepository.save(replyPost);
        }
        catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }


    public Post repost(Integer postId,String token){
        String username = tokenService.getUserNameFromToken(token);
        AppUser user = userService.getUserByName(username);

        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistsException::new);

        Set<AppUser> reposts = post.getReposts();
        if(reposts.contains(user)){
            reposts = reposts.stream().filter(u-> u.getUserId() != user.getUserId()).collect(Collectors.toSet());
        }
        else {
            reposts.add(user);
        }
        post.setReposts(reposts);

        return  postRepository.save(post);
    }

    public Post like (Integer postId,String token){
        String username = tokenService.getUserNameFromToken(token);
        AppUser user = userService.getUserByName(username);

        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistsException::new);

        Set<AppUser> likes = post.getLikes();
        if(likes.contains(user)){
            likes = likes.stream().filter(u-> u.getUserId() != user.getUserId()).collect(Collectors.toSet());
        }
        else {
            likes.add(user);
        }
        post.setLikes(likes);

        return  postRepository.save(post);
    }



    public Post bookmark (Integer postId,String token){
        String username = tokenService.getUserNameFromToken(token);
        AppUser user = userService.getUserByName(username);

        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistsException::new);

        Set<AppUser> bookmarks = post.getBookmarks();
        if(bookmarks.contains(user)){
            bookmarks = bookmarks.stream().filter(u-> u.getUserId() != user.getUserId()).collect(Collectors.toSet());
        }
        else {
            bookmarks.add(user);
        }
        post.setBookmarks(bookmarks);

        return  postRepository.save(post);
    }


    public Post views (Integer postId,String token){
        String username = tokenService.getUserNameFromToken(token);
        AppUser user = userService.getUserByName(username);

        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistsException::new);

        Set<AppUser> views = post.getViews();
        if(views.contains(user)){
            return  post;
        }

        views.add(user);

        post.setViews(views);
        try{
            return  postRepository.save(post);
        }
        catch (Exception e){
            return post;
        }
    }

    public  List<Post> viewPosts(List<Integer> postIds,String token){
        String username = tokenService.getUserNameFromToken(token);
        AppUser user = userService.getUserByName(username);

        List<Post> posts    = postRepository.findByPostIdIn(postIds).orElse(new ArrayList<>());

        List<Post> postToUpdate = posts.stream()
                .filter(post -> !post.getViews().contains(user))
                .map(post -> {
            Set<AppUser> views = post.getViews();
            views.add(user);
            post.setViews(views);
            return post;
        }).toList();

        List<Post> updatedPosts = postRepository.saveAll(postToUpdate);

        posts.removeAll(updatedPosts);
        posts.addAll(updatedPosts);

        Collections.sort(posts);

        return posts;

    }

//    public List<Post> viewPosts(List<Integer> postIds, String token) {
//        String username = tokenService.getUserNameFromToken(token);
//        AppUser user = userService.getUserByName(username);
//
//        // Fetch posts by IDs
//        List<Post> posts = postRepository.findByPostIdIn(postIds).orElse(Collections.emptyList());
//
//        // Update views for posts that don't already include the user
//        List<Post> postsToUpdate = posts.stream()
//                .filter(post -> !post.getViews().contains(user))
//                .peek(post -> post.getViews().add(user))
//                .collect(Collectors.toList());
//
//        // Save updated posts and return sorted results
//        if (!postsToUpdate.isEmpty()) {
//            postRepository.saveAll(postsToUpdate);
//        }
//
//        return posts.stream()
//                .sorted()
//                .collect(Collectors.toList());
//    }



}
