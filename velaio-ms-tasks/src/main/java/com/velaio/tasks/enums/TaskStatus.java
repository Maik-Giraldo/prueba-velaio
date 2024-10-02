package com.velaio.tasks.enums;

public enum TaskStatus {
    PENDING(0L),
    COMPLETED(1L);

    private final Long code;

    TaskStatus(Long code) {
        this.code = code;
    }

    public Long getCode() {
        return code;
    }

    public static TaskStatus fromCode(Long code) {
        for (TaskStatus status : TaskStatus.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid status code: " + code);
    }
}
