package com.velaio.tasks.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PersonDTO {
    @JsonProperty("full_name")
    private String fullName;
    private Long age;
    private List<SkillDTO> skills;
}
