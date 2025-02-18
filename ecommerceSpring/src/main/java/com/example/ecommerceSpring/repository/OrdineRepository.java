package com.example.ecommerceSpring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerceSpring.model.Ordine;
import com.example.ecommerceSpring.model.User;

public interface OrdineRepository extends JpaRepository <Ordine, Long> {

	//Richiamo ai dati del modello Ordine
		List <Ordine> findByUserId(Long id);
		
		List<Ordine> findByUser(User user); // Use this method
		
}
