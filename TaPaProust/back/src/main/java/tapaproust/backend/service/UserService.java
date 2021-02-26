package tapaproust.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tapaproust.backend.entity.User;
import tapaproust.backend.repository.UserRepository;
import tapaproust.backend.utils.SSLEmail;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //Should use register
    public void addUser(String mail, String pwdHash, String phone){
        User u = new User();
        u.setMail(mail); u.setPhone(phone);u.setPwdHash(passwordEncoder.encode(pwdHash));
        insert(u);
    }
    public void insert(User user){
        if (userRepository.findByMail(user.getMail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "user with mail : " + user.getMail() + " already exists");
        userRepository.save(user);
    }

    public long getIdFromMail(String userMail) {
        return checkUserExists(userRepository.findByMail(userMail), "mail", userMail).getId();
    }

    /**
     * Username must be unique and that the two hashes match
     * we must store encoded passwords as spring security expects
     */
    public String register(String mail, String pwd, String pwdBis, String phone) {
        checkRegisterCondition(mail, pwd,pwdBis,phone);
        User user = new User();
        user.setMail(mail);
        user.setPwdHash(passwordEncoder.encode(pwd));
        user.setPhone(phone);
        user.setEnabled(false);
        user.setToken(generateString());
        insert(user);
        SSLEmail sslEmail = new SSLEmail(user.getMail(),user.getToken(),user.getId());
        sslEmail.send();
        return "user with mail : " + mail + " has been created";
    }

    public User getUserByMail(String mail){
        return checkUserExists(userRepository.findByMail(mail),"mail", mail);
    }

    public User getUserById(long id){
        return checkUserExists(userRepository.findById(id),"id", ""+id);
    }
    private User checkUserExists(Optional<User> ou, String name, String value){
        if(!ou.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user with "+name+" : " + value + " not found");
        }
        return ou.get();
    }
    private String generateString() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 20;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    public String confirmToken(long id, String token) {
        User u = getUserById(id);
        if(u.getToken().equals(token)){
            u.setEnabled(true);
            userRepository.save(u);
            return "Merci d'avoir confirmé votre compte \n" +
                    "Vous pouvez maintenant retourner sur l'application et vous connecter";
        }
        return "Ce lien n'est pas valide" ;
    }


    private void checkRegisterCondition(String mail, String pwd, String pwdBis, String phone) {
        if (!pwdBis.equals(pwd)) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "passwords don't match");
        }
            // if the username is new
        Optional<User> ou = userRepository.findByMail(mail);
        if (ou.isPresent()) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED,"user already exists");
        }
        if(!mail.endsWith("@edu.ge.ch")) {
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "Mail of user is not ending with \"@edu.ge.ch\"");
        }
        if(!phone.startsWith("+")){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "phone should start with +");
        }
    }

}
