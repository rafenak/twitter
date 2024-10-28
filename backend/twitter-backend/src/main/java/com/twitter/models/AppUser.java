package com.twitter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(unique = true)
    private String email;

    private String phone;

    @Column(name = "dob")
    private Date dateOfBirth;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    private String bio;

    private String nickname;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_picture", referencedColumnName = "image_id")
    private Image profilePicture;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "banner_picture", referencedColumnName = "image_id")
    private Image bannerPicture;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "following", joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "following_id")}
    )
    @JsonIgnore
    private Set<AppUser> following;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "followers", joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "follower_id")}
    )
    @JsonIgnore
    private Set<AppUser> followers;

    /* security related*/

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    private Boolean enabled;

    @Column(nullable = true)
    @JsonIgnore
    private Long verification;

    public AppUser() {
        this.authorities = new HashSet<>();
        this.enabled = false;
        this.following = new HashSet<>();
        this.followers = new HashSet<>();
    }

}
