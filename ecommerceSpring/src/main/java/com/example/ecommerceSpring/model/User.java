package com.example.ecommerceSpring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity

public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; //id univoco
	
	@Column(nullable = false, unique = true)
	private String username; //username univoco
	
	@Column (nullable = false)
	private String name; //nome utente
	
	@Column (nullable = false)
	private String surname; //cognome utente
	
	@Column (nullable = false, unique = true)
	private String email; //email utente. Deve essere univoca
	
	@Column (nullable = true, unique = true)
	private String piva; //partita iva utente. Sarà nullable
	
	@Column (nullable = false)
	private String password; //password utente
	
	@Column (nullable = true, unique = true)
	private String token; //token utente
	
	//GET e SET
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPiva() {
		return piva;
	}
	public void setPiva(String piva) {
		this.piva = piva;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
}
