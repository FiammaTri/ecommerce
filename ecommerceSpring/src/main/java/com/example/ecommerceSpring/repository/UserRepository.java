package com.example.ecommerceSpring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceSpring.model.User;

public interface UserRepository extends JpaRepository <User, Long> {

	//Richiamo ai dati del modello User
	Optional<User> findByUsername(String username);
	
	//Query personalizzata per selezionare il token su User
	Optional<User> findByToken(String token);
}
