package com.velaio.tasks.dto;

import lombok.Getter;

@Getter
public class CustomException extends Exception {
    private final ErrorResponseDTO errorResponse;

    public CustomException(ErrorResponseDTO errorResponse) {
        super(errorResponse.getMessage());
        this.errorResponse = errorResponse;
    }
}
