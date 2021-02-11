package tapaproust.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tapaproust.backend.entity.Book;
import tapaproust.backend.entity.Favorite;
import tapaproust.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    public List<Favorite> findByUser(User u);
    public Optional<Favorite> findByUserAndBook(User u, Book b);
}
