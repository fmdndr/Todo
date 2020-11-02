package com.world.TodoBackend.payload.request;

import java.time.LocalDate;

import javax.persistence.Column;

import org.springframework.stereotype.Service;

@Service
public class TodoRequest {

	@Column(name = "username")
	private String username;
	@Column(name = "description")
	private String description;
	@Column(name = "target_date")
	private LocalDate createdDate;
	@Column(name = "updated_date")
	private LocalDate updatedDate;
	@Column(name = "is_done")
	private Boolean isDone;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDate getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDate updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Boolean getIsDone() {
		return isDone;
	}

	public void setIsDone(Boolean isDone) {
		this.isDone = isDone;
	}

}
