package com.example.ecommerceSpring.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerceSpring.auth.TokenService;
import com.example.ecommerceSpring.exception.ResourceNotFoundException;
import com.example.ecommerceSpring.model.User;
import com.example.ecommerceSpring.repository.UserRepository;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

	@Autowired
	private TokenService tokenService;

	@Autowired
	private UserRepository userRepository;

	// Metodo per ottenere una lista di tutti gli utenti
	@GetMapping
	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	// Metodo per creare un nuovo utente
	@PostMapping
	public Object createUser(@RequestBody User user, HttpServletResponse response) {
		if (user.getEmail()==null || user.getName()==null || user.getSurname()==null || user.getUsername()==null || user.getPassword()==null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Compilare tutti i campi obbligatori");
		}
		return userRepository.save(user);
	}

	// metodo per ottenere uno specifico utente tramite ID
	// Controllo che entra in funzione quando si vuole accedere al profilo
	@GetMapping("/profilo/{id}")
	public Object getUserById(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
		// Ottiene l'utente autenticato dal token
		User authUser = getAuthenticatedUser(request);
		if (authUser == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
		}
		// Controllo se l'id del token è diverso da l'id passato nell'URL
		// authUser.getId()!=id
		if (!(authUser.getId() == id)) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
		}

		return authUser;
	}

	/**
	 * Metodo di utilità per estrarre il token di autenticazione dall'header
	 * "Authorization". Il token viene inviato nel formato "Bearer <token>".
	 *
	 * @param request Oggetto HttpServletRequest contenente gli header della
	 *                richiesta
	 * @return L'oggetto AuthUser associato al token, oppure null se il token non è
	 *         presente o non valido
	 */
	private User getAuthenticatedUser(HttpServletRequest request) {
		// Legge l'header "Authorization"
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && !authHeader.isEmpty()) {
			String token;
			// Se il token è inviato come "Bearer <token>", lo estrae
			if (authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
			} else {
				token = authHeader;
			}
			// Usa il TokenService per ottenere l'utente associato al token
			return tokenService.getAuthUser(token);
		}
		// Se non c'è header "Authorization", restituisce null
		return null;
	}

	/**
	 * Endpoint riservato agli amministratori che consente di aggiungere un nuovo
	 * utente. Richiede un token valido e che l'utente autenticato abbia il ruolo
	 * "admin".
	 *
	 * @param newUser  Oggetto User da aggiungere (ricevuto in formato JSON)
	 * @param request  Oggetto HttpServletRequest per leggere l'header
	 *                 "Authorization"
	 * @param response Oggetto HttpServletResponse per impostare lo status in caso
	 *                 di errore
	 * @return Messaggio di successo oppure errore
	 */
	@PostMapping("/addUser")
	public Object addUser(@RequestBody User newUser) {
		// Salva il nuovo utente nel database
		userRepository.save(newUser);
		return Collections.singletonMap("message", "Utente aggiunto con successo");
	}

}
