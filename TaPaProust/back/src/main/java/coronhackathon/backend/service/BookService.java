package coronhackathon.backend.service;

import coronhackathon.backend.entity.Book;
import coronhackathon.backend.repository.BookRepository;
import coronhackathon.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private UserRepository userRepository;
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


    public void modifyBook(long bookId, String title, String author, String edition, String state, String language, String price) {
        Book b = checkBookExists(bookRepository.findById(bookId), "id", ""+bookId);
        b.update(title,author, edition, state, language, price);
        bookRepository.save(b);
    }

    public void addBook(String title, String author, String edition, String state, String mailOfOwner, String language, String price) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setEdition(edition);
        book.setState(state);
        book.setLanguage(language);
        book.setPrice(price);
        book.setSold_by(userRepository.findByMail(mailOfOwner).get().getId());
        bookRepository.save(book);
    }

    /**
     * Returns all the books with a certain author title and edition that are each optional
     * @param title
     * @param author
     * @param edition
     * @return
     */
    public List<Book> getBooks(String title, String author, String edition) {
        if(!title.equals("")){
            if(!author.equals("")){
                if(!edition.equals("")){
                    return bookRepository.findByTitleAndAuthorAndEdition(title, author,edition);
                }else{
                    return bookRepository.findByTitleAndAuthor(title, author);
                }
            }else{
                if(!edition.equals("")){
                    return bookRepository.findByTitleAndEdition(title, edition);
                }else{
                    return bookRepository.findByTitle(title);
                }
            }
        }else{
            if(!author.equals("")){
                if(!edition.equals("")){
                    return bookRepository.findByAuthorAndEdition(author,edition);
                }else{
                    return bookRepository.findByAuthor(author);
                }
            }else{
                if(!edition.equals("")){
                    return bookRepository.findByEdition(edition);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "All the entries are null");
                }

            }
        }
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
