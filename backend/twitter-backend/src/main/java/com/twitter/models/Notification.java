package com.twitter.models;

import com.twitter.enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notification_id")
    private Integer notificationId;

    @Enumerated
    @Column(name = "notification_type")
    private NotificationType notificationType;

    @Column(name = "notification_timestamp")
    private LocalDateTime notificationTimeStamp;

    private boolean acknowledged;

    @ManyToOne
    @JoinColumn(name = "recipient_user_id")
    private AppUser recipient;

    @ManyToOne
    @JoinColumn(name = "action_user_id")
    private AppUser actionUser;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = true)
    private Post post;

    //TODO: Add Message fields

}

