package com.example.ecommerceSpring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrdineDettagli {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="ordine_id")
	private Ordine ordine;
	
	//id del prodotto acquistato
	private Long idProdotto; 
	
	//quantità dei prodotti acquistati
	private int quantita;
}
