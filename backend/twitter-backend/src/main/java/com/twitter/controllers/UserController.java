package com.twitter.controllers;


import com.twitter.models.AppUser;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private  final UserService userService;
    private final TokenService tokenService;

    @GetMapping("/verify")
    public AppUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        String username="";
        AppUser user;

        if(token.startsWith("Bearer")){
           // String 
        }

        return null;

    }
}
