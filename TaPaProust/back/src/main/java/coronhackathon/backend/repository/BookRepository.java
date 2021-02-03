package coronhackathon.backend.repository;

import coronhackathon.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    public Optional<Book> findById(Long aLong);
    public List<Book> findAll();
    public List<Book> findByTitleIgnoreCase(String title);
    public List<Book> findByAuthorIgnoreCase(String author);
    public List<Book> findByEditionIgnoreCase(String edition);
    public List<Book> findByTitleIgnoreCaseAndAuthorIgnoreCaseAndEditionIgnoreCase(String title, String author, String Edition);
    public List<Book> findByTitleIgnoreCaseAndAuthorIgnoreCase(String title, String author);
    public List<Book> findByTitleIgnoreCaseAndEditionIgnoreCase(String title, String edition);
    public List<Book> findByAuthorIgnoreCaseAndEditionIgnoreCase(String author, String edition);
}
