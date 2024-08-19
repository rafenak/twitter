package com.twitter.exceptions;

public class UserDoesNotExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UserDoesNotExistException() {
        super("The user you are looking for does not exits");

    }
}
