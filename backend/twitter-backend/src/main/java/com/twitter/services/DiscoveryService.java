package com.twitter.services;

import com.twitter.models.AppUser;
import com.twitter.repositories.UserRepository;
import com.twitter.utils.DiscoveryUserComparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DiscoveryService {

    private final UserRepository userRepository;
    private final DiscoveryUserComparator discoveryUserComparator;

    public Set<AppUser> searchForUser(String searchTerm) {

        List<AppUser> userByUsername = userRepository.findByUsernameContainingIgnoreCase(searchTerm);
        List<AppUser> userByNickname = userRepository.findByNicknameContainingIgnoreCase(searchTerm);
        List<AppUser> userByBio = userRepository.findByBioContainingIgnoreCase(searchTerm);

//        Set<AppUser> combinedSet = Stream.concat(
//                userByUsername.stream(),
//                Stream.concat(userByNickname.stream(), userByBio.stream())
//        ).collect(Collectors.toSet());
//
//        Set<AppUser> sortedApplicationUserSet = new TreeSet<>(discoveryUserComparator);
//        sortedApplicationUserSet.addAll(combinedSet);

        Set<AppUser> sortedApplicationUserSet = new TreeSet<>(discoveryUserComparator);
        sortedApplicationUserSet.addAll(Stream.concat(
                userByUsername.stream(),
                Stream.concat(userByNickname.stream(), userByBio.stream())
        ).collect(Collectors.toSet()));

        return sortedApplicationUserSet;

    }
}
