package com.velaio.tasks.dto;

import lombok.Data;
import java.util.List;

@Data
public class TaskListResponse {
    private List<TaskDTO> data;
}