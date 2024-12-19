package com.example.todobackend.service;

import com.example.todobackend.model.Todo;
import com.example.todobackend.model.Priority;
import com.example.todobackend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }
    
    public Optional<Todo> getTodoById(String id) {
        return todoRepository.findById(id);
    }
    
    public Todo updateTodo(String id, Todo todoDetails) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        todo.setDueDate(todoDetails.getDueDate());
        todo.setPriority(todoDetails.getPriority());
        todo.setTags(todoDetails.getTags());
        todo.setCategory(todoDetails.getCategory());
        todo.setReminder(todoDetails.isReminder());
        todo.setNotes(todoDetails.getNotes());
        todo.setUpdatedAt(LocalDateTime.now());
        
        return todoRepository.save(todo);
    }
    
    public List<Todo> findByCategory(String category) {
        return todoRepository.findByCategory(category);
    }
    
    public List<Todo> findByPriority(Priority priority) {
        return todoRepository.findByPriority(priority);
    }
    
    public List<Todo> findByDueDateBefore(LocalDateTime date) {
        return todoRepository.findByDueDateBefore(date);
    }
    
    public void deleteTodo(String id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        todoRepository.delete(todo);
    }
} 