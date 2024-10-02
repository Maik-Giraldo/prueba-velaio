package com.velaio.tasks.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String name;
    private Long status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("limit_date")
    private Date limitDate;
    private List<PersonDTO> persons;
}
