package com.nesta.tashilat.controller;


import com.nesta.tashilat.bean.User;
import com.nesta.tashilat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:4200","http://localhost:4210"})
@RequestMapping("users")
@RestController
public class UserController {


    @Autowired
    private UserRepository userRepository;


    @GetMapping("/all")
    public List<User> findAll()
    {
        return userRepository.findAll();
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username)
    {
        User user = userRepository.findByLogin(username);

        if(user != null)
        {
            return new ResponseEntity<User>(user,HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }
}
