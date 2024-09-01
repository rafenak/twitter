package com.twitter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_id")
    private Long imageId;
    @Column(name = "image_name",unique = true)
    private String imageName;
    @Column(name = "image_type")
    private String imageType;
    @Column(name = "image_path")
    @JsonIgnore
    private String imagePath;
    @Column(name = "image_url")
    private String imageURL;

}
