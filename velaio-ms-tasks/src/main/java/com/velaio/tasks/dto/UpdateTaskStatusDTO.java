package com.velaio.tasks.dto;

import com.velaio.tasks.enums.TaskStatus;

import lombok.Data;

@Data
public class UpdateTaskStatusDTO {
    private TaskDTO task;
    private TaskStatus status;
}
