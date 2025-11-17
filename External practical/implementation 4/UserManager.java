package com.example.demo;

import org.springframework.stereotype.Service;

@Service
public class UserManager {

    private final NameFormatter formatter;
    private final UserRepository repository;

    public UserManager(NameFormatter formatter, UserRepository repository) {
        this.formatter = formatter;
        this.repository = repository;
    }

    public void createUser(String name) {
        String formatted = formatter.format(name);
        repository.save(formatted);
        System.out.println("User created successfully!");
    }
}
