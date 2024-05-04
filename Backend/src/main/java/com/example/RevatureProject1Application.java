package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.example.models")
@ComponentScan("com.example")
@EnableJpaRepositories("com.example.DAOs")
public class RevatureProject1Application {

	public static void main(String[] args) {
		SpringApplication.run(RevatureProject1Application.class, args);
	}

}
