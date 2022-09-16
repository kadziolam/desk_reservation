package org.example.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserDetailsService{
    Optional<User> findByUsername(String username);

    default UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsername(username).orElse(null);

    }


}
