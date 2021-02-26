package tapaproust.backend.utils;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

public class SSLEmail {
    /**
     Outgoing Mail (SMTP) Server
     requires TLS or SSL: smtp.gmail.com (use authentication)
     Use Authentication: Yes
     Port for SSL: 465
     */
    private String fromEmail = "tapaproust@gmail.com";
    private String password = "YVP1tvI7JKejFstjNOch";
    private String toEmail;
    private String token;
    private long id;

    public SSLEmail(String toEmail, String token, long id) {
        this.toEmail = toEmail;
        this.token = token;
        this.id = id;
    }

    public String send(){
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
        props.put("mail.smtp.socketFactory.port", "465"); //SSL Port
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory"); //SSL Factory Class
        props.put("mail.smtp.auth", "true"); //Enabling SMTP Authentication
        props.put("mail.smtp.port", "465"); //SMTP Port

        Authenticator auth = new Authenticator() {
            //override the getPasswordAuthentication method
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        };

        Session session = Session.getDefaultInstance(props, auth);
        EmailUtils.sendEmail(session, toEmail,"TaPaProust : Email confirmation",
                "Veuillez confirmer votre email pour utiliser TaPaProust et pouvoir acheter ou vendre des livres en appuyant sur ce lien\n" +
                        "https://tapaproust.herokuapp.com/confirm_token?id="+this.id+"&token="+this.token);

        return "Email sended";
    }

}
