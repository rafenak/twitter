package com.twitter.controllers;


import com.twitter.exceptions.EmailAlreadyTakenException;
import com.twitter.exceptions.UnableToResolvePhotoException;
import com.twitter.exceptions.UnableToSavePhotoException;
import com.twitter.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;


    @ExceptionHandler({UnableToResolvePhotoException.class, UnableToSavePhotoException.class})
    public ResponseEntity<String> handlePhotoExceptions() {
        return new ResponseEntity<String>("Unable to process the photo",
                HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String fileName) throws UnableToResolvePhotoException {
        byte[] imageBytes = imageService.downloadImage(fileName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf(imageService.getImageType(fileName)))
                .body(imageBytes);
    }
}
