package com.twitter.controllers;


import com.twitter.exceptions.FollowException;
import com.twitter.exceptions.UnableToResolvePhotoException;
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

import java.util.LinkedHashMap;
import java.util.Set;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;
    private final ImageService imageService;

    @GetMapping("/{username}")
    public AppUser getUserByUserName(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String username) {
        return userService.getUserByName(username);
    }

    @GetMapping("/verify")
    public AppUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String username = tokenService.getUserNameFromToken(token);
        return userService.getUserByName(username);
    }

    @PostMapping("/pfp")
    public AppUser uploadProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestParam("image") MultipartFile file) throws UnableToSavePhotoException {
        String username = tokenService.getUserNameFromToken(token);
        return userService.setProfileOrBannerPicture(username, file, "pfp");
    }

    @PostMapping("/banner")
    public AppUser uploadBannerPicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestParam("image") MultipartFile file) throws UnableToSavePhotoException {
        String username = tokenService.getUserNameFromToken(token);
        return userService.setProfileOrBannerPicture(username, file, "bnr");
    }

    @PostMapping("/organization")
    public ResponseEntity<byte[]> setUserOrganization(@RequestPart("user") String user,
                                                      @RequestPart("file") MultipartFile file,
                                                      @RequestPart("organization") String organization) throws UnableToResolvePhotoException {

        byte[] org = userService.setUserOrganization(user, file, organization);
        return ResponseEntity.ok(org);
    }

    @PutMapping("/")
    public AppUser updateUser(AppUser user) {
        return userService.updateUser(user);
    }

    @ExceptionHandler({FollowException.class})
    public ResponseEntity<String> handleFollowException() {
        return new ResponseEntity<String>("User cannot follow themselves",
                HttpStatus.FORBIDDEN);
    }

    @PutMapping("/follow")
    public Set<AppUser> followUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LinkedHashMap<String, String> body) throws FollowException {
        String loggedInUser = tokenService.getUserNameFromToken(token);
        String followedUser = body.get("followedUser");
        return userService.followUser(loggedInUser, followedUser);
    }

    @GetMapping("/following/{username}")
    public Set<AppUser> getFollowingList(@PathVariable String username) {
        return userService.retrieveFollowingList(username);
    }

    @GetMapping("/followers/{username}")
    public Set<AppUser> getFollowersList(@PathVariable String username) {
        return userService.retrieveFollowersList(username);
    }


}
