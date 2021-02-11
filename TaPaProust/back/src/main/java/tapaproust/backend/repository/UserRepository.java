package tapaproust.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tapaproust.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findById(long id);
    public Optional<User> findByMail(String mail);
}
