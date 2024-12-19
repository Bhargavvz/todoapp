package com.example.todobackend.repository;

import com.example.todobackend.model.Todo;
import com.example.todobackend.model.Priority;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findByCategory(String category);
    List<Todo> findByPriority(Priority priority);
    List<Todo> findByDueDateBefore(LocalDateTime date);
    List<Todo> findByTags(String tag);
} 