package com.twitter;

import com.twitter.models.Role;
import com.twitter.repositories.RoleRepository;
import com.twitter.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TwitterBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwitterBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepo, UserRepository userRepo) {
        return args -> {
            roleRepo.save(new Role(1, "USER"));
//			AppUser appUser = new AppUser();
//			appUser.setFirstName("Rafe");
//			appUser.setLastName("Nakhuda");
//			HashSet<Role> roles = new HashSet<>();
//			roles.add(roleRepo.findByAuthority("USER").get());
//			appUser.setAuthorities(roles);
//			userRepo.save(appUser);
        };
    }

}
