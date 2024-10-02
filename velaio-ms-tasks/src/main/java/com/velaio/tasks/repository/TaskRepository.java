package com.velaio.tasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.velaio.tasks.entity.Task;
import com.velaio.tasks.enums.TaskStatus;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus statusCode);

}
