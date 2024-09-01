package com.twitter;

import com.twitter.config.RSAkeyProperties;
import com.twitter.models.AppUser;
import com.twitter.models.Role;
import com.twitter.repositories.RoleRepository;
import com.twitter.repositories.UserRepository;
import com.twitter.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableConfigurationProperties(RSAkeyProperties.class)
public class TwitterBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwitterBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepo, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
           Role r= roleRepo.save(new Role(1, "USER"));

            Set<Role> roles = new HashSet<>();
            roles.add(r);

			AppUser appUser = new AppUser();
			appUser.setFirstName("Rafe");
			appUser.setLastName("Nakhuda");
            appUser.setEmail("rafe@mail.com");
            appUser.setUsername("rafen");
            appUser.setPassword(encoder.encode("password"));
            appUser.setEnabled(true);
			appUser.setAuthorities(roles);

            userRepository.save(appUser);
        };
    }

}
