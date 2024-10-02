package com.velaio.tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.velaio.tasks.entity.TaskPerson;

import java.util.List;

@Repository
public interface TaskPersonRepository extends JpaRepository<TaskPerson, Long> {
    List<TaskPerson> findByTaskId(Long taskId);
}