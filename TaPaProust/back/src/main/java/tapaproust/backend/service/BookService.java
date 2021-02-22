package tapaproust.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import tapaproust.backend.entity.Book;
import tapaproust.backend.entity.User;
import tapaproust.backend.repository.BookRepository;
import tapaproust.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(long id){
        Optional<Book> ob= bookRepository.findById(id);
        return checkBookExists(ob, "id", ""+id);
    }

//    public void addBook(Book book){
//        //Verify book is not empty
//        bookRepository.save(book);
//    }


    public void modifyBook(long bookId, String title, String author, String edition,
                           String state, String language, String price, List<String> photos) {
        Book b = checkBookExists(bookRepository.findById(bookId), "id", ""+bookId);
        b.update(title,author, edition, state, language, price, photos);
        bookRepository.save(b);
    }

    public void addBook(String title, String author, String edition, String state,
                        String mailOfOwner, String language, String price, List<String> photos) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setEdition(edition);
        book.setState(state);
        book.setLanguage(language);
        book.setPrice(price);
        book.setSoldById(userRepository.findByMail(mailOfOwner).get().getId());
        book.setPhotos(photos);
        bookRepository.save(book);
    }

    public List<Book> getBooks(String title, String author, String edition) {
        if(!title.equals("")){
            if(!author.equals("")){
                if(!edition.equals("")){
                    return bookRepository.findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCaseAndEditionContainingIgnoreCase(title, author,edition);
                }else{
                    return bookRepository.findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCase(title, author);
                }
            }else{
                if(!edition.equals("")){
                    return bookRepository.findByTitleContainingIgnoreCaseAndEditionContainingIgnoreCase(title, edition);
                }else{
                    return bookRepository.findByTitleContainingIgnoreCase(title);
                }
            }
        }else{
            if(!author.equals("")){
                if(!edition.equals("")){
                    return bookRepository.findByAuthorContainingIgnoreCaseAndEditionContainingIgnoreCase(author,edition);
                }else{
                    return bookRepository.findByAuthorContainingIgnoreCase(author);
                }
            }else{
                if(!edition.equals("")){
                    return bookRepository.findByEditionContainingIgnoreCase(title);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "All the entries are null");
                }

            }
        }
    }


    public List<Book> getMyBooks(long userId) {
        return bookRepository.findBySoldById(userId);
    }

    public void removeBook(long bookId) {
        bookRepository.deleteById(bookId);
    }


    private Book checkBookExists(Optional<Book> ou, String name, String value){
        if(!ou.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book with "+name+" : " + value + " not found");
        }
        return ou.get();
    }

}
