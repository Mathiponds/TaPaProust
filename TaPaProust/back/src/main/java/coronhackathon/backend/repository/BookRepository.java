package coronhackathon.backend.repository;

import coronhackathon.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Override
    public Optional<Book> findById(Long aLong);
}
