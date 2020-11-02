package com.world.TodoBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.world.TodoBackend.Entities.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

	List<Todo> findByUsername(String username);





}
