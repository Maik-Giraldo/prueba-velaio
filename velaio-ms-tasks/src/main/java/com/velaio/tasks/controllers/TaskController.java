package com.velaio.tasks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.velaio.tasks.dto.CreateTaskHttpRequest;
import com.velaio.tasks.dto.CustomException;
import com.velaio.tasks.dto.ErrorResponseDTO;
import com.velaio.tasks.dto.HttpResponseDTO;
import com.velaio.tasks.dto.TaskListResponse;
import com.velaio.tasks.dto.UpdateTaskStatusDTO;
import com.velaio.tasks.enums.TaskStatus;
import com.velaio.tasks.services.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     * Crea una nueva tarea y la guarda en la base de datos.
     * 
     * Este método recibe un objeto TaskDTO a través del cuerpo de la
     * petición
     * y lo utiliza para crear una nueva tarea. Si la creación es exitosa, devuelve
     * la
     * tarea creada con un estado HTTP 201 (CREATED).
     * 
     * @param taskDTO El DTO que contiene la información necesaria para crear la
     *                tarea.
     * @return La tarea creada en un ResponseEntity con el estado HTTP 201.
     * @throws Exception Si ocurre algún error durante la creación de la tarea, como
     *                   una validación fallida.
     */
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody CreateTaskHttpRequest createTaskHttpRequest) {
        try {
            HttpResponseDTO response = taskService.createTask(createTaskHttpRequest);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getErrorResponse(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponseDTO(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtiene una lista de tareas filtradas por estado.
     * 
     * Este método permite obtener tareas según un filtro opcional de estado. Si no
     * se
     * proporciona el estado (parámetro nulo), devuelve todas las tareas. Si se
     * proporciona
     * un código de estado, devuelve las tareas que coincidan con dicho estado.
     * 
     * @param status El código opcional de estado de la tarea (0: PENDING, 1:
     *               COMPLETED).
     * @return Una lista de tareas filtradas dentro de un ResponseEntity con
     *         el
     *         estado HTTP 200 (OK).
     */
    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam(required = false) Long status) {
        try {
            TaskStatus taskStatus = null;
            if (status != null) {
                taskStatus = TaskStatus.fromCode(status);
            }

            TaskListResponse tasks = taskService.getTasks(taskStatus);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Estado inválido: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Controlador que maneja la actualización del estado de una tarea.
     *
     * @param updateStatusTaskDTO DTO que contiene la tarea y el nuevo estado.
     * @return Respuesta con mensaje de éxito o error en caso de excepción.
     */
    @PutMapping()
    public ResponseEntity<?> updateTaskStatus(@RequestBody UpdateTaskStatusDTO updateStatusTaskDTO) {
        try {
            taskService.updateTaskStatus(updateStatusTaskDTO.getTask(), updateStatusTaskDTO.getStatus());
            return new ResponseEntity<>(new HttpResponseDTO("Estado de la tarea actualizado."), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponseDTO(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
