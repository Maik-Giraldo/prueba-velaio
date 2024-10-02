CREATE SCHEMA velaio;
USE velaio;


CREATE TABLE persons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    age BIGINT NOT NULL
);


CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    person_id BIGINT,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id) REFERENCES persons(id)
        ON DELETE CASCADE
);

-- Table for 'tasks'
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    limit_date DATE NOT NULL
);


CREATE TABLE task_person (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT,
    person_id BIGINT,
    CONSTRAINT fk_task
        FOREIGN KEY (task_id) REFERENCES tasks(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_persont
        FOREIGN KEY (person_id) REFERENCES persons(id)
        ON DELETE CASCADE
);

