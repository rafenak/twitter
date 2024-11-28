package com.twitter.controllers;

import com.twitter.models.Notification;
import com.twitter.request.AcknowledgeNotificationRequest;
import com.twitter.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private  final NotificationService notificationService;


    @GetMapping("/unread/{id}")
    public List<Notification> fetchUserUnreadNotifications(@PathVariable("id") Integer userId){
       return notificationService.fetchUserNotification(userId);
    }

    @PostMapping("/acknowledge")
    public ResponseEntity<String> acknowledgeNotifications(@RequestBody AcknowledgeNotificationRequest body){
         notificationService.acknowledgeNotifications(body.getNotifications());

        return ResponseEntity.ok("Acknowledged Notifications");
     }



}
