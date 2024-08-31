package com.twitter.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "rsa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RSAkeyProperties {

    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

/**
 *  Commented as for now generating key externally find the commands in HELP.md file
 */
//    public RSAkeyProperties(){
//        KeyPair pair = KeyGenerator.generateRsaKey();
//        this.publicKey = (RSAPublicKey) pair.getPublic();
//        this.privateKey = (RSAPrivateKey) pair.getPrivate();
//    }

}
