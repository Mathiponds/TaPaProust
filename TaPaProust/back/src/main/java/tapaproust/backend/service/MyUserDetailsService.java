package tapaproust.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import tapaproust.backend.entity.User;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    //
    public UserDetails loadUserByUsername(String mail) {
        User user = userService.getUserByMail(mail);
        boolean enabled = user.isEnabled() ;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;


        List<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
        auths.add(new SimpleGrantedAuthority("USER"));
        if(user.getMail().equals("admin@tapaproust.ch")) {
            auths.add(new SimpleGrantedAuthority("ADMIN"));
        }
        return new org.springframework.security.core.userdetails.User
                (user.getMail(), user.getPwdHash(),

                        enabled, accountNonExpired,
                        credentialsNonExpired, accountNonLocked,

                        auths);
    }

}