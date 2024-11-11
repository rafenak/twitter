package com.twitter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitter.enums.Audience;
import com.twitter.enums.ReplyRestriction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "posts")
@AllArgsConstructor
@Getter
@Setter
public class Post implements Comparable<Post>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;

    @Column(length = 256, nullable = false)
    private String content;

    @Column(name = "posted_date")
    private LocalDateTime postDate;

    @Column(name = "is_reply",nullable = true)
    private Boolean reply;

    @Column(name = "reply_to")
    private Integer replyTo;

    @ManyToOne
    @JoinColumn(name = "author_id",nullable = false)
    private AppUser author;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "post_likes", joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> likes;

    @OneToMany
    private List<Image> images;

    //To do for video upload

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "post_reply", joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "reply_id")}
    )
    private Set<Post> replies;


    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "post_repost", joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> reposts;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "post_bookmarks", joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> bookmarks;


    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "post_view", joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<AppUser> views;

    private boolean scheduled;

    @Column(name = "scheduled_date",nullable = true)
    private LocalDateTime scheduledDate;

    @Enumerated(EnumType.ORDINAL)
    private Audience audience;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "reply_restriction")
    private ReplyRestriction replyRestriction;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "poll_id",referencedColumnName = "poll_id")
    private Poll poll;

    public  Post(){
        super();
        this.likes= new HashSet<>();
        this.images= new ArrayList<>();
        this.replies= new HashSet<>();
        this.reposts= new HashSet<>();
        this.bookmarks= new HashSet<>();
        this.views= new HashSet<>();
    }


    @Override
    public int compareTo(Post o) {
        return -this.postDate.compareTo(o.postDate);
    }

    public boolean isReply() {
        return Boolean.TRUE.equals(reply); // Returns false if null
    }
}
