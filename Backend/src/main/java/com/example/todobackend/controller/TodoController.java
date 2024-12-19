package com.example.todobackend.controller;

import com.example.todobackend.model.Todo;
import com.example.todobackend.model.Priority;
import com.example.todobackend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {
    
    @Autowired
    private TodoService todoService;
    
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }
    
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
        return todoService.getTodoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todoDetails) {
        try {
            Todo updatedTodo = todoService.updateTodo(id, todoDetails);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable String id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Todo>> getTodosByCategory(@PathVariable String category) {
        return ResponseEntity.ok(todoService.findByCategory(category));
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable Priority priority) {
        return ResponseEntity.ok(todoService.findByPriority(priority));
    }

    @GetMapping("/due-before")
    public ResponseEntity<List<Todo>> getTodosDueBefore(@RequestParam LocalDateTime date) {
        return ResponseEntity.ok(todoService.findByDueDateBefore(date));
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        try {
            todoService.getAllTodos();
            return ResponseEntity.ok("Connection successful");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Connection failed: " + e.getMessage());
        }
    }
} 