package com.twitter.repositories;

import com.twitter.models.AppUser;
import com.twitter.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    List<Notification> getByRecipientAndAcknowledgedFalse(AppUser recipient);
}
