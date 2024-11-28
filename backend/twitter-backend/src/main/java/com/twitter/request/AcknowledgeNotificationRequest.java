package com.twitter.request;

import com.twitter.models.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AcknowledgeNotificationRequest {

    private List<Notification> notifications;

}
