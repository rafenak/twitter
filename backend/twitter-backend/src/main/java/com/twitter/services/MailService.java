package com.twitter.services;

import com.twitter.exceptions.EmailFailedToSendException;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class MailService {

    private final Gmail gmail;

    public void sendEmail(String  toAddress,String subject,String content) throws Exception{

        Properties properties = new Properties();
        Session session = Session.getInstance(properties, null);
        MimeMessage email =  new MimeMessage(session);

        try {
            email.setFrom(new InternetAddress("nakhudarafe@gmail.com"));
            email.addRecipients(jakarta.mail.Message.RecipientType.TO, String.valueOf(new InternetAddress(toAddress)));
            email.setSubject(subject);
            email.setText(content);

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            email.writeTo(buffer);

            byte[] rawMessageBytes = buffer.toByteArray();

            String encodedEmail = Base64.encodeBase64URLSafeString(rawMessageBytes);

            Message message =  new Message();
            message.setRaw(encodedEmail);
            message = gmail.users().messages().send("me",message).execute();

        }catch (Exception e){
            throw  new EmailFailedToSendException();
        }
    }
}
