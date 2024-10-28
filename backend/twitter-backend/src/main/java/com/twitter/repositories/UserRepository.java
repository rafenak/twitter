package com.twitter.repositories;

import com.twitter.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Integer> {
    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmailOrPhoneOrUsername(String email,String phone,String username);

    List<AppUser> findByUsernameContainingIgnoreCase(String username);

    List<AppUser> findByNicknameContainingIgnoreCase(String nickname);

    List<AppUser> findByBioContainingIgnoreCase(String bio);
}
