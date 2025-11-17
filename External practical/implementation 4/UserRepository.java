package com.example.demo;

import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    public void save(String name) {
        System.out.println("Saving user: " + name);
    }
}
