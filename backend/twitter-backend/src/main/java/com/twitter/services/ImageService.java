package com.twitter.services;


import com.twitter.exceptions.UnableToResolvePhotoException;
import com.twitter.exceptions.UnableToSavePhotoException;
import com.twitter.models.Image;
import com.twitter.repositories.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    private static final File DIRECTORY = new File("/Users/rafe/Desktop/Work/twitter/backend/twitter-backend/img");
    private static final String URL = "http://localhost:8000/images/";
    private final ImageRepository imageRepository;

    /**
     * Use to upload the image into File director and save meta into database
     * @param file
     * @param prefix
     * @return message
     */
    public Image  uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
        try {
            // The content type from the file request something like img/jpeg or img/png
            String extension = "." + Optional.ofNullable(file.getContentType())
                    .map(contentType -> contentType.substring(contentType.indexOf('/') + 1))
                    .orElse("");

            //String extension = "."+ file.getContentType().split("/")[1];

            File img = File.createTempFile(prefix, extension, DIRECTORY);
            file.transferTo(img);

            String imageURL = URL + img.getName();

            Image i = new Image();
            i.setImageName(img.getName());
            i.setImageType(file.getContentType());
            i.setImagePath(img.getPath());
            i.setImageURL(imageURL);

            Image saved = imageRepository.save(i);

            return saved;

        } catch (IOException e) {
            throw new UnableToSavePhotoException();
        }
    }


    /**
     *  download the image from image directory by looking meta information
     * @param fileName
     * @return
     */
    public byte[] downloadImage(String fileName) throws UnableToResolvePhotoException{
        try {
            Image image = imageRepository.findByImageName(fileName).get();
            String filePath = image.getImagePath();
            byte[] imagesBytes = Files.readAllBytes(new File(filePath).toPath());
            return imagesBytes;
        } catch (IOException e) {
           throw  new UnableToResolvePhotoException();
        }
    }

    /**
     * find the image type
     * @param fileName
     * @return
     */
    public  String getImageType(String fileName){
        Image image = imageRepository.findByImageName(fileName).get();
        return image.getImageType();
    }
}
