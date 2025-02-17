package com.example.ecommerceSpring.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerceSpring.model.User;
import com.example.ecommerceSpring.repository.UserRepository;

@Service
public class TokenService {
	
	@Autowired
	private UserRepository userRepository;
	
	 /**
     * Metodo che genera un token casuale (UUID) e lo associa ad un utente autenticato.
     *
     * @param username lo username dell'utente
     * @param role     il ruolo dell'utente (es. admin o user)
     * @return il token generato
     */
	public String generateToken(String username) {
		//Generata un token univoco
		String token = UUID.randomUUID().toString();
		
		//prende il record con username = username
		Optional <User> optionalUser = userRepository.findByUsername(username); 
		// cambiare il suo campo token
        // crea l'oggetto user per poterlo modificare
		User user = optionalUser.get();
		user.setToken(token);
		userRepository.save(user);
		return token;
		
	}
	
	 /**
     * Restituisce l'oggetto AuthUser associato al token.
     *
     * @param token il token di autenticazione
     * @return l'oggetto AuthUser, oppure null se il token non è valido
     */
	public User getAuthUser(String token) {
		Optional<User> optionalUser = userRepository.findByToken(token);
		User user = optionalUser.get();
		return user;
	}
	
	/**
     * Rimuove un token dalla mappa, ad esempio durante il logout.
     *
     * @param token il token da rimuovere
     */
	public void removeToken(String token) {
		//trova chi ha il toke assegnato
		Optional<User> optionalUser = userRepository.findByToken(token);
    	User user = optionalUser.get();
    	user.setToken(null);
    	userRepository.save(user);
	}
}
