package com.world.TodoBackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.world.TodoBackend.Entities.Todo;
import com.world.TodoBackend.payload.request.TodoRequest;
import com.world.TodoBackend.payload.response.MessageResponse;
import com.world.TodoBackend.repository.TodoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/todo")
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;

	@GetMapping("/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {

		return todoRepository.findByUsername(username);
	}

	@PutMapping("/update/{username}/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable Long id,
			@RequestBody Todo todo) {

		todoRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);

	}

	@PostMapping("/add/{username}/todo")
	public ResponseEntity<MessageResponse> saveTodo(@PathVariable String username,
			@RequestBody TodoRequest todoRequest) {

		todoRequest.setUsername(username);
		System.out.println(todoRequest.getCreatedDate());

		Todo todo = new Todo(todoRequest.getUsername(), todoRequest.getDescription(), todoRequest.getCreatedDate(),
				todoRequest.getUpdatedDate(), todoRequest.getIsDone());

		todoRepository.save(todo);
		return ResponseEntity.ok(new MessageResponse("Todo Saved Successfully"));
	}
	@DeleteMapping("/delete/{username}/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable String username , @PathVariable Long id){
		  
		todoRepository.deleteById(id);
		
		return ResponseEntity.ok(new MessageResponse("Todo Deleted Successfully"));
		
	}

}
