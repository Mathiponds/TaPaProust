package coronhackathon.backend.repository;


import coronhackathon.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findById(long id);
    public Optional<User> findByMail(String mail);
}
