package com.nesta.tashilat.repository;

import com.nesta.tashilat.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findById(int id);

    User findByLogin(String login);

}
