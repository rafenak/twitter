package com.twitter.controllers;

import com.twitter.exceptions.*;
import com.twitter.models.AppUser;
import com.twitter.request.FindUsernameRequest;
import com.twitter.request.RegistrationRequest;
import com.twitter.response.LoginResponse;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken() {
        return new ResponseEntity<String>("The email provided already in use",
                HttpStatus.CONFLICT);
    }

    @PostMapping("/register")
    public AppUser registerUser(@RequestBody RegistrationRequest ro) {
        return userService.registerUser(ro);
    }


    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist() {
        return new ResponseEntity<String>("The user you are looking for does not exits",
                HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/phone")
    public AppUser updatePhoneNumber(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String phone = body.get("phone");

        AppUser user = userService.getUserByName(username);
        user.setPhone(phone);
        return userService.updateUser(user);
    }


    @ExceptionHandler({EmailFailedToSendException.class})
    public ResponseEntity<String> handleFailEmail() {
        return new ResponseEntity<String>("Email  failed to send, try again in a moment",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body) {
        userService.generateEmailVerification(body.get("username"));

        return new ResponseEntity<String>("Verification code generated, email sent", HttpStatus.OK);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> incorrectCodeHandler() {
        return new ResponseEntity<String>("The code entered did not match the user  verification code",
                HttpStatus.CONFLICT);
    }

    @PostMapping("/email/verify")
    public AppUser verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        Long code = Long.parseLong(body.get("code"));
        String username = body.get("username");

        return userService.verifyEmail(username, code);
    }

    @PutMapping("/update/password")
    public AppUser updatePassword(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return userService.setPassword(username, password);
    }


    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCredentials() {
        return new ResponseEntity<String>("Invalid credentials",
                HttpStatus.FORBIDDEN);
    }


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String, String> body) throws InvalidCredentialsException {
        String username = body.get("username");
        String password = body.get("password");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            String token = tokenService.generateToken(authentication);
            return new LoginResponse(userService.getUserByName(username), token);
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }

    @PostMapping("/find")
    public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameRequest credential) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        String username = userService.verifyUsername(credential);
        return new ResponseEntity<String>(username, HttpStatus.OK);

    }

}
