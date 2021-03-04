package tapaproust.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tapaproust.backend.entity.Book;
import tapaproust.backend.entity.User;
import tapaproust.backend.repository.UserRepository;
import tapaproust.backend.service.BookService;
import tapaproust.backend.service.FavoriteService;
import tapaproust.backend.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
public class mainController {
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/")
    public String hello(@RequestParam (defaultValue = "Ma") String name){ //Ajouter ?name=Votreprenom à la fin de l'URL
        return "Je m'appelle "+name;
    }

    @GetMapping("/login_successful")
    public String loginSucess(){
        return "Login is successful";
    }

    @GetMapping("/login_failure")
    public String loginFailure(){
        return "Login is failure";
    }

    @GetMapping("/logout_successful")
    public String logoutSucess(){
        return "Logout is successful";
    }

    @GetMapping("/confirm_token")
    public String confirmToken(@RequestParam long id, @RequestParam String token){
        return userService.confirmToken(id, token);

    }

    /**
     * Returns all the books with a certain author title and edition that are each optional
     * @param title
     * @param author
     * @param edition
     * @return
     */
    @GetMapping("/api/getBooks")
    public List<Book> getBooks(@RequestParam (defaultValue = "") String title,
                               @RequestParam (defaultValue = "") String author,
                               @RequestParam (defaultValue = "") String edition){
        return bookService.getBooks(title, author, edition);
    }

    @GetMapping("/api/getMyBooks")
    public List<Book> getMyBooks(Principal principal){
        return bookService.getMyBooks(userService.getIdFromMail(principal.getName()));
    }
    /**
     * Get all the books from the ook repository
     * @return a list containing all these books
     */
    @GetMapping("/api/getAllBooks")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    /**
     * Add a book to the repository
     * @param principal
     * @param title
     * @param author
     * @param edition
     * @param state
     * @param language
     * @param price
     */
    @PostMapping("/api/addBook")
    public Book addBook(Principal principal,
                        @RequestParam String title,
                        @RequestParam String author,
                        @RequestParam String edition,
                        @RequestParam String state,
                        @RequestParam String language,
                        @RequestParam String price) {
        return bookService.addBook(title, author, edition, state,
                principal.getName(), language, price);
    }

    /**
     * Modify certain values of a book
     * @param bookId
     * @param title
     * @param author
     * @param edition
     * @param state
     * @param language
     * @param price
     */
    @Modifying
    @PostMapping("/api/modifyBook")
    public void modifyBook(@RequestParam long bookId,
                           @RequestParam String title,
                           @RequestParam String author,
                           @RequestParam String edition,
                           @RequestParam String state,
                           @RequestParam String language,
                           @RequestParam String price){
        bookService.modifyBook(bookId, title, author, edition, state, language, price);
    }

    /**
     * Romove a book with a certain Id
     * @param bookId
     */
    @PostMapping("/admin/removeBook")
    public void modifyBook(@RequestParam long bookId){
        bookService.removeBook(bookId);
    }


    /*******************************************/
    /*************     USERS       *************/
    /*******************************************/
    @PostMapping("/register")
    public ResponseEntity register(@RequestParam String mail,
                                   @RequestParam String pwd,
                                   @RequestParam String pwdConfirmation,
                                   @RequestParam String phone) {
        return userService.register(mail, pwd, pwdConfirmation, phone);
    }

    @PostMapping("/admin/addUser")
    public void addUser(Principal principal,
                        @RequestParam String mail,
                        @RequestParam String pwdHash,
                        @RequestParam String phone) {
        userService.addUser(mail, pwdHash, phone);
    }

    @PostMapping("/admin/removeUser")
    public void removeUser(@RequestParam long userId) {
        userService.removeUser(userId);
    }

    @GetMapping("/admin/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/api/getUserPhone")
    public ResponseEntity<String> getUserPhone(@RequestParam long bookId){
        return userService.getUserPhone(bookId);
    }

    /*******************************************/
    /*************   FAVORITES     *************/
    /*******************************************/


    @PostMapping("/api/addToFav")
    public void addToFavorites(Principal principal, @RequestParam long bookId){
        favoriteService.addToFavorites(userService.getIdFromMail(principal.getName()), bookId);
    }


    @PostMapping("/api/removeFromFav")
    public void removeFromFavorites(Principal principal, @RequestParam long bookId){
        favoriteService.removeFromFav(userService.getIdFromMail(principal.getName()), bookId);
    }


    @GetMapping("/api/getMyFavBooks")
    public List<Book> getMyFavBooks(Principal principal){
        return favoriteService.getFavBooksOfUser(userService.getUserByMail(principal.getName()));
    }


    @PostMapping("/api/bookSold")
    public ResponseEntity<Book> bookSold(@RequestParam long bookId, @RequestParam String token){
        return bookService.bookSold(bookId, token);
    }

    @PostMapping("/api/bookUnsold")
    public ResponseEntity<Book> bookUnsold(@RequestParam long bookId, @RequestParam String token){
        return bookService.bookUnsold(bookId, token);
    }

    //ToDo
    @PostMapping("/api/modifyUserNumber")
    public void modifyNumber(Principal principal, @RequestParam String newNumber){

    }

    //ToDo
    @PostMapping("/api/modifyUserPW")
    public void modifyPassWord(Principal principal){

    }
}