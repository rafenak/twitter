package com.twitter.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;
    private final UserService userService;

    /**
     * Generate JWT token using Authentication Manager
     * @param authentication
     * @return
     */
    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();

        String scope = authentication.getAuthorities().stream().map(
                GrantedAuthority::getAuthority
        ).collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(authentication.getName())
                .claim("roles", scope)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }

    /**
     * Decode the token and find the username
     * @param token
     * @return
     */
    public String getUserNameFromToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        String username = decoded.getSubject();
        return username;
    }


}
