package com.twitter.utils;

import com.twitter.models.AppUser;
import org.springframework.stereotype.Component;

import java.util.Comparator;

@Component
public class DiscoveryUserComparator implements Comparator<AppUser> {
    @Override
    public int compare(AppUser o1, AppUser o2) {
        return -Integer.compare(o1.getFollowers().size(), o2.getFollowers().size());
    }
}
