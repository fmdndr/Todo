package com.world.TodoBackend.payload.request;

import java.util.Set;

import javax.persistence.Column;

public class SignupRequest {
	
	@Column(name="first_name")
	private String firstname;
	
	@Column(name="last_name")
	private String lastname;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	private Set<String> role;

	@Column(name = "password")
	private String password;

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return this.role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
}
