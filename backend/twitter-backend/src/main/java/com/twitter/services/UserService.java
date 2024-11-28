package com.twitter.services;

import com.twitter.exceptions.*;
import com.twitter.models.AppUser;
import com.twitter.models.Image;
import com.twitter.models.Role;
import com.twitter.repositories.RoleRepository;
import com.twitter.repositories.UserRepository;
import com.twitter.request.FindUsernameRequest;
import com.twitter.request.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int NUMBER_LENGTH = 9; // Length of the number part
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    public AppUser getUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(UserDoesNotExistException::new);
    }

    /**
     * find the username from the database
     *
     * @param username
     * @return
     */
    public AppUser getUserByName(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    /**
     * Update user details into the database
     *
     * @param user
     * @return
     */
    public AppUser updateUser(AppUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }


    /**
     * Registration request to create an account into the system
     *
     * @param ro
     * @return
     * @throws EmailAlreadyTakenException
     */
    public AppUser registerUser(RegistrationRequest ro) throws EmailAlreadyTakenException {

        AppUser user = new AppUser();
        user.setFirstName(ro.getFirstName());
        user.setLastName(ro.getLastName());
        user.setEmail(ro.getEmail());
        user.setDateOfBirth(ro.getDob());

        String baseName = user.getFirstName() + user.getLastName();
        String username = "";
        Set<String> attemptedUsernames = new HashSet<>();

        //To insert nickname of the user
        String nickname = ro.getFirstName() + " " + ro.getLastName();
        user.setNickname(nickname);

        do {
            username = generateUserName(baseName);
        } while (isUsernameTaken(username, attemptedUsernames));

//        String  name = user.getFirstName()+user.getLastName();
//        boolean nameTaken = true;
//
//        String tempName="";
//
//        while (nameTaken){
//            tempName=generateUserName(name);
//            if(userRepository.findByUsername(name).isEmpty()){
//                nameTaken=false;
//            }
//        }
        user.setUsername(username);

        Set<Role> roles = user.getAuthorities();
        roles.add(roleRepository.findByAuthority("USER").get());
        user.setAuthorities(roles);
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }

    }

    /**
     * Generate Email Verification code and Send the code to the user inbox
     *
     * @param username
     */
    public void generateEmailVerification(String username) {

        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        user.setVerification(generateVerificationNumber());
        try {
            mailService.sendEmail(user.getEmail(),
                    "Your verification Code",
                    "Here is your verification Code: " + user.getVerification());
            userRepository.save(user);
        } catch (Exception e) {
            throw new EmailFailedToSendException();
        }
    }

    /**
     * Generate Random number
     *
     * @return
     */
    private long generateVerificationNumber() {
        return RANDOM.nextLong(100_000_000);
    }

    /**
     * Generate Random number to append at end of the username
     *
     * @param name
     * @return
     */
    private String generateUserName(String name) {
        long generatedNumber = RANDOM.nextLong(1_000_000_000);
        return name + String.format("%0" + NUMBER_LENGTH + "d", generatedNumber);
    }

    /**
     * check the username is already in use or generate a new
     *
     * @param username
     * @param attemptedUsernames
     * @return
     */
    private boolean isUsernameTaken(String username, Set<String> attemptedUsernames) {
        if (attemptedUsernames.contains(username)) {
            return true; // Avoid redundant checks
        }
        attemptedUsernames.add(username);
        return userRepository.findByUsername(username).isPresent();
    }


    /**
     * Check the verification code is matching
     *
     * @param username
     * @param code
     * @return
     */
    public AppUser verifyEmail(String username, Long code) {

        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        if (code.equals(user.getVerification())) {
            user.setEnabled(true);
            user.setVerification(null);
            return userRepository.save(user);
        } else {
            throw new IncorrectVerificationCodeException();
        }
    }

    /**
     * update user password into db and encode the password
     *
     * @param username
     * @param password
     * @return
     */
    public AppUser setPassword(String username, String password) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    /**
     * UserDetails to check the username and password is present
     *
     * @param username the username identifying the user whose data is required.
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities = user.getAuthorities().stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());

        UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);

        return userDetails;
    }

    public AppUser setProfileOrBannerPicture(String username, MultipartFile file, String prefix)
            throws UnableToSavePhotoException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        Image photo = imageService.uploadImage(file, prefix);

        try {
            if (prefix.equals("pfp")) {
                if (user.getProfilePicture() != null && !user.getProfilePicture()
                        .getImageName().equals("defaultpfp.png")) {
                    Path path = Paths.get(user.getProfilePicture().getImagePath());
                    Files.deleteIfExists(path);
                }
                user.setProfilePicture(photo);
            } else {
                if (user.getBannerPicture() != null && !user.getBannerPicture()
                        .getImageName().equals("defaultbnr.png")) {
                    Path path = Paths.get(user.getBannerPicture().getImagePath());
                    Files.deleteIfExists(path);
                }
                user.setBannerPicture(photo);
            }
        } catch (IOException e) {
            throw new UnableToSavePhotoException();
        }

//        if (prefix.equals("pfp")) {
//            user.setProfilePicture(photo);
//        } else {
//            user.setBannerPicture(photo);
//        }
        return userRepository.save(user);
    }

    public byte[] setUserOrganization(String username, MultipartFile file, String orgName) throws UnableToResolvePhotoException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        Image orgImage = imageService.getImageByImageName(orgName)
                .orElseGet(() -> {
                    try {
                        return imageService.createOrganization(file, orgName);
                    } catch (UnableToSavePhotoException e) {
                        return null;
                    }
                });

        if (orgImage != null) {
            user.setOrganization(orgImage);
            userRepository.save(user);

            try {
                return Files.readAllBytes(new File(orgImage.getImagePath()).toPath());
            } catch (IOException e) {
                throw new UnableToResolvePhotoException();
            }

        } else {
            throw new UnableToResolvePhotoException("We are unable to find or save the organization photo");

        }
    }


    public AppUser followUser(String user, String followee) throws FollowException {

        if (user.equals(followee)) throw new FollowException();

        AppUser loggedInUser = userRepository.findByUsername(user).orElseThrow(UserDoesNotExistException::new);
        Set<AppUser> followingList = loggedInUser.getFollowing();

        AppUser followedUser = userRepository.findByUsername(followee).orElseThrow(UserDoesNotExistException::new);
        Set<AppUser> followersList = followedUser.getFollowers();

        if(followersList.contains(followedUser)){
            followersList.remove(followedUser);
        }
        else{
            followingList.add(followedUser);
        }
        //Add the followed use to following list
        loggedInUser.setFollowing(followingList);

        //Add the current user into follower list of the followee
        if(followersList.contains(loggedInUser)){
            followersList.remove(loggedInUser);
        }else{
            followersList.add(loggedInUser);
        }
        followedUser.setFollowers(followersList);

        //update both  users
        userRepository.save(loggedInUser);
        userRepository.save(followedUser);

        return loggedInUser;
    }

    public Set<AppUser> retrieveFollowingList(String username) {
        AppUser user = userRepository
                .findByUsername(username)
                .orElseThrow(UserDoesNotExistException::new);

        return user.getFollowing();
    }

    public Set<AppUser> retrieveFollowersList(String username) {
        AppUser user = userRepository
                .findByUsername(username)
                .orElseThrow(UserDoesNotExistException::new);

        return user.getFollowers();
    }

    public String verifyUsername(FindUsernameRequest credential) {
        AppUser user = userRepository
                .findByEmailOrPhoneOrUsername
                        (credential.getEmail(),
                                credential.getPhone(), credential.getUsername()).
                orElseThrow(UserDoesNotExistException::new);

        return user.getUsername();
    }

    public AppUser getUserEmailAndPhone(FindUsernameRequest credential) {
        return userRepository.findByEmailOrPhoneOrUsername
                        (credential.getEmail(),
                                credential.getPhone(), credential.getUsername()).
                orElseThrow(UserDoesNotExistException::new);
    }
}
