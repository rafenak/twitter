package com.twitter.exceptions;

public class UnableToCreatePostException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public UnableToCreatePostException() {
        super("Unable to create a post at this time");
    }
}
