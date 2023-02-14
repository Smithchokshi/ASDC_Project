package com.groupten.datawiz.repository;

import com.groupten.datawiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    //added since user_id is the Primary Key of the User's table (will need for searching for DB connections later)
    User findByUserId(int user_id);
}
