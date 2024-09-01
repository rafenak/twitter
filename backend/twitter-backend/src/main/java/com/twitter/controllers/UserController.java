package com.twitter.controllers;


import com.twitter.exceptions.UnableToSavePhotoException;
import com.twitter.models.AppUser;
import com.twitter.services.ImageService;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;
    private  final ImageService imageService;

    @GetMapping("/verify")
    public AppUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String username = "";
        AppUser user;
        if (token.startsWith("Bearer")) {
            username = tokenService.getUserNameFromToken(token.substring(7));
        }
        try {
            user = userService.getUserByName(username);
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @PostMapping("/pfp")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("image") MultipartFile file) throws UnableToSavePhotoException {
        String uploadImage = imageService.uploadImage(file,"pfp");
        return  ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }
}
