package coronhackathon.backend.repository;

import coronhackathon.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    public Optional<Book> findById(Long aLong);
    public List<Book> findAll();
    public List<Book> findByTitle(String title);
    public List<Book> findByAuthor(String author);
    public List<Book> findByEdition(String edition);
    public List<Book> findByTitleAndAuthorAndEdition(String title, String author, String Edition);
    public List<Book> findByTitleAndAuthor(String title, String author);
    public List<Book> findByTitleAndEdition(String title, String edition);
    public List<Book> findByAuthorAndEdition(String author, String edition);


}
