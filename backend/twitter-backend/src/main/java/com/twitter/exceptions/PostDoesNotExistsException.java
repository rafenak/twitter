package com.twitter.exceptions;

public class PostDoesNotExistsException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public PostDoesNotExistsException() {
        super("The post requested does not exists");
    }
}