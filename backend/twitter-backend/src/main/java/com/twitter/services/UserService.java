package com.twitter.services;

import com.twitter.exceptions.EmailAlreadyTakenException;
import com.twitter.exceptions.EmailFailedToSendException;
import com.twitter.exceptions.IncorrectVerificationCodeException;
import com.twitter.exceptions.UserDoesNotExistException;
import com.twitter.models.AppUser;
import com.twitter.models.Role;
import com.twitter.repositories.RoleRepository;
import com.twitter.repositories.UserRepository;
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

    /**
     *  find the username from the database
     * @param username
     * @return
     */
    public AppUser getUserByName(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    /**
     *  Update user details into the database
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
     * @return
     */
    private long generateVerificationNumber() {
        return RANDOM.nextLong(100_000_000);
    }

    /**
     * Generate Random number to append at end of the username
     * @param name
     * @return
     */
    private String generateUserName(String name) {
        long generatedNumber = RANDOM.nextLong(1_000_000_000);
        return name + String.format("%0" + NUMBER_LENGTH + "d", generatedNumber);
    }

    /**
     * check the username is already in use or generate a new
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
}
