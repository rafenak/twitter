package com.twitter.services;

import com.twitter.enums.NotificationType;
import com.twitter.models.AppUser;
import com.twitter.models.Notification;
import com.twitter.models.Post;
import com.twitter.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final SimpMessagingTemplate template;

    public void createAndSendPostNotification(Post post) {
        AppUser author = userService.getUserById(post.getAuthor().getUserId());
        Set<AppUser> followers = userService.retrieveFollowersList(author.getUsername());

        List<Notification> notifications = followers.stream()
                .map(follower -> {
                    Notification notification = new Notification();
                    notification.setNotificationType(NotificationType.NEW_POST);
                    notification.setNotificationTimeStamp(LocalDateTime.now());
                    notification.setAcknowledged(true);
                    notification.setRecipient(follower);
                    notification.setActionUser(author);
                    notification.setPost(post);

                    return notification;
                })
                .collect(Collectors.toList());

        notificationRepository.saveAll(notifications);

        //TODO: Send the notification to each followers users

        notifications.forEach(
                notification ->
                        template.convertAndSendToUser(notification.getRecipient().getUsername(),
                                "/notifications", notification
                        ));

    }

    public void createAndSendNotification(NotificationType type, AppUser recipient, AppUser actionUser, Post post) {
        Notification notification = new Notification();
        notification.setNotificationType(type);
        notification.setNotificationTimeStamp(LocalDateTime.now());
        notification.setAcknowledged(false);
        notification.setRecipient(recipient);
        notification.setActionUser(actionUser);
        notification.setPost(post);

        notificationRepository.save(notification);

        template.convertAndSendToUser(notification.getRecipient().getUsername(),
                "/notifications", notification);

    }

    public void createAndSendFollowNotification(AppUser recipient, AppUser actionUser) {
        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.FOLLOW);
        notification.setNotificationTimeStamp(LocalDateTime.now());
        notification.setAcknowledged(false);
        notification.setRecipient(recipient);
        notification.setActionUser(actionUser);

        notificationRepository.save(notification);

        template.convertAndSendToUser(notification.getRecipient().getUsername(),
                "/notifications", notification);
    }

    public List<Notification> fetchUserNotification(Integer userId){
        AppUser user = userService.getUserById(userId);
        return  notificationRepository.getByRecipientAndAcknowledgedFalse(user);
    }

    public void acknowledgeNotifications(List<Notification> notifications){
        List<Notification> acknowledgedNotifications = notifications
                            .stream()
                            .map(notification ->
                            {notification.setAcknowledged(true); return notification;}).toList();

        notificationRepository.saveAll(acknowledgedNotifications);

    }
}
