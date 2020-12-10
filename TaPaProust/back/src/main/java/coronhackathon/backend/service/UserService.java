package coronhackathon.backend.service;

import coronhackathon.backend.entity.User;
import coronhackathon.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void insert(User user){
        if (userRepository.findByMail(user.getMail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "user with mail : " + user.getMail() + " already exists");
        userRepository.save(user);
    }
}
