package coronhackathon.backend.repository;

import coronhackathon.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    public Optional<Book> findById(Long aLong);
    public List<Book> findAll();
    public List<Book> findBySoldById(long id);
    public List<Book> findByTitleContainingIgnoreCase(String title);
    public List<Book> findByAuthorContainingIgnoreCase(String author);
    public List<Book> findByEditionContainingIgnoreCase(String edition);
    public List<Book> findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCase(String title, String author);
    public List<Book> findByTitleContainingIgnoreCaseAndEditionContainingIgnoreCase(String title, String edition);
    public List<Book> findByAuthorContainingIgnoreCaseAndEditionContainingIgnoreCase(String author, String edition);
    public List<Book> findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCaseAndEditionContainingIgnoreCase(String title, String author, String Edition);
}
