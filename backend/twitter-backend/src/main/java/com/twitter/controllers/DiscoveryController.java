package com.twitter.controllers;

import com.twitter.models.AppUser;
import com.twitter.services.DiscoveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/discovery")
@RequiredArgsConstructor
public class DiscoveryController {

    private  final DiscoveryService discoveryService;


    @GetMapping("/users")
    public Set<AppUser> searchForUsers(@RequestParam String searchTerm){
        return  discoveryService.searchForUser(searchTerm);
    }
}
