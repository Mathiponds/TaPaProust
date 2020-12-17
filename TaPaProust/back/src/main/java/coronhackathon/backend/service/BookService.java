package coronhackathon.backend.service;

import coronhackathon.backend.entity.Book;
import coronhackathon.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book getBookById(long id){
        Optional<Book> ob= bookRepository.findById(id);
        return checkBookExists(ob, "id", ""+id);
    }

    private Book checkBookExists(Optional<Book> ou, String name, String value){
        if(!ou.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book with "+name+" : " + value + " not found");
        }
        return ou.get();
    }
}
