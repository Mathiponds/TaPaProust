package tapaproust.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;
import tapaproust.backend.entity.User;
import tapaproust.backend.repository.UserRepository;
import tapaproust.backend.utils.SSLEmail;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookService bookService;
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
    public ResponseEntity<List<String>> register(String mail, String pwd, String pwdBis, String phone) {
        ResponseEntity<List<String>> re = checkRegisterCondition(mail, pwd,pwdBis,phone);
        if(re.getStatusCode() == HttpStatus.ACCEPTED)
            return re;
        User user = new User();
        user.setMail(mail);
        user.setPwdHash(passwordEncoder.encode(pwd));
        user.setPhone(phone);
        user.setEnabled(false);
        user.setToken(generateString());
        insert(user);
        SSLEmail sslEmail = new SSLEmail(user.getMail(),user.getToken(),user.getId());
        sslEmail.send();
        ArrayList<String> a = new ArrayList<>();
        a.add("user with mail : " + mail + " has been created");
        return ResponseEntity.status(HttpStatus.OK).body(a);
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


    private ResponseEntity<List<String>>  checkRegisterCondition(String mail, String pwd, String pwdBis, String phone) {
        List<String> l = new ArrayList<>();
        String messageMail = "";
        String messagePW = "";
        String messagePWBIS = "";
        String messagePhone = "";
        //MAIL
        if (mail.equals("")) {
            messageMail += "Veuillez rentrer un email.";
        } else if (userRepository.findByMail(mail).isPresent()) {
            messageMail += "Cet email a déjà été enregistré. Vous avez reçu un mail pour le confirmer";
        } else if (!validateEmail(mail)){
            messageMail += "Cet email n'a pas le bon format : prenom.nom@edu.ge.ch";
        }
        l.add(messageMail);
        //PW
        if(pwd.length() < 6) {
            messagePW += "Votre mot de passe doit avoir au moins 6 caractères.";
        }
        l.add(messagePW);
        if(!pwd.equals(pwdBis)){
            messagePWBIS += "Vos deux mot de passe doivent concorder.";
        }
        l.add(messagePWBIS);
        if(phone.equals("")){
            messagePhone += "Votre numéro ne doit pas être vide.\n";
        }
        if(!validatePhone(phone)){
            messagePhone += "Votre numéro doit commencer par '+' doit être composé que de chiffre.\n";
        }
        messagePhone = messagePhone.substring(0,Math.max(0,messagePhone.length()-1));
        l.add(messagePhone);
        if(messagePhone.equals("") && messageMail.equals("") && messagePW.equals("") && messagePWBIS.equals("")){
            return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<String>());
        }else{
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(l);
        }
    }
    private static final String EMAIL_PATTERN = "[_A-Za-z-+]+(.[_A-Za-z-]+)*@" + "edu.ge.ch";
    private boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
    private boolean validatePhone(String phone) {
        return phone.startsWith("+") && phone.substring(1).chars().allMatch( Character::isDigit );
    }

    public void removeUser(long userId) {
        userRepository.deleteById(userId);
    }

    /**
     *
     * @param bookId
     * @return a string with a '+' in front (ex. +41774834486)
     */
    public ResponseEntity<String> getUserPhone(long bookId) {
        User u = getUserById(bookService.getBookById(bookId).getSoldById());
        return ResponseEntity.status(HttpStatus.OK).body(u.getPhone());
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


}
