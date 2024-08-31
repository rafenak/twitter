package com.twitter.config;

import java.security.KeyPair;
import java.security.KeyPairGenerator;


/**
 *  Generating key externally find the commands in HELP.md file
 */

public class KeyGenerator {

    public static KeyPair generateRsaKey(){


        KeyPair keyPair;

        try{
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        }catch(Exception e){
            throw new IllegalStateException();
        }

        return keyPair;

    }
}