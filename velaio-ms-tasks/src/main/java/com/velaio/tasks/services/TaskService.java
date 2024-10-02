package com.velaio.tasks.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.velaio.tasks.dto.CreateTaskHttpRequest;
import com.velaio.tasks.dto.HttpResponseDTO;
import com.velaio.tasks.dto.PersonDTO;
import com.velaio.tasks.dto.SkillDTO;
import com.velaio.tasks.dto.TaskDTO;
import com.velaio.tasks.dto.TaskListResponse;
import com.velaio.tasks.entity.Person;
import com.velaio.tasks.entity.Skill;
import com.velaio.tasks.entity.Task;
import com.velaio.tasks.entity.TaskPerson;
import com.velaio.tasks.enums.TaskStatus;
import com.velaio.tasks.repository.PersonRepository;
import com.velaio.tasks.repository.SkillRepository;
import com.velaio.tasks.repository.TaskPersonRepository;
import com.velaio.tasks.repository.TaskRepository;

import jakarta.transaction.Transactional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    TaskPersonRepository taskPersonRepository;

    @Transactional
    /**
     * Crea una nueva tarea junto con las personas asignadas y sus habilidades.
     * 
     * Este método recibe TaskDTO que contiene los datos de la tarea,
     * las personas a ser creadas y las habilidades de cada persona. Cada persona
     * debe ser mayor de edad para ser registrada y cada persona puede tener
     * múltiples habilidades que también son creadas y asociadas a la persona.
     * 
     * @param taskDTO El DTO que contiene la información de la tarea, las personas
     *                asociadas y sus respectivas habilidades.
     * @return La entidad Task creada y guardada en la base de datos.
     * @throws Exception Si alguna persona tiene una edad menor a 18 años, se
     *                   lanzará una excepción indicando que debe ser mayor de edad.
     */
    public HttpResponseDTO createTask(CreateTaskHttpRequest createTaskRequest) throws Exception {
        // Extraer TaskDTO del DTO de entrada
        TaskDTO taskDTO = createTaskRequest.getData();

        // Crear una nueva tarea
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setStatus(TaskStatus.PENDING);
        task.setLimitDate(taskDTO.getLimitDate());

        List<Long> personIds = new ArrayList<>();
        Set<String> addedPersonNames = new HashSet<>();
        List<Person> personsToSave = new ArrayList<>();

        // Validaciones y recolección de personas
        for (PersonDTO personDTO : taskDTO.getPersons()) {
            if (addedPersonNames.contains(personDTO.getFullName())) {
                throw new Exception("La persona " + personDTO.getFullName() + " ya ha sido agregada a esta tarea.");
            }

            if (personDTO.getAge() < 18) {
                throw new Exception("La persona " + personDTO.getFullName() + " debe ser mayor de edad.");
            }

            // Validar que el nombre tenga al menos 5 caracteres
            if (personDTO.getFullName() == null || personDTO.getFullName().length() < 5) {
                throw new Exception("El nombre de la persona debe tener al menos 5 caracteres.");
            }

            // Validar que la persona tenga al menos una habilidad
            if (personDTO.getSkills() == null || personDTO.getSkills().isEmpty()) {
                throw new Exception(
                        "La persona " + personDTO.getFullName() + " necesita tener al menos una habilidad.");
            }

            // Validar que todas las habilidades no sean nulas o vacías
            for (SkillDTO skillDTO : personDTO.getSkills()) {
                if (skillDTO.getName() == null || skillDTO.getName().isEmpty()) {
                    throw new Exception(
                            "La persona " + personDTO.getFullName() + " debe tener al menos una habilidad.");
                }
            }

            // Agregar la persona a la lista para guardar
            Person newPerson = new Person();
            newPerson.setFullname(personDTO.getFullName());
            newPerson.setAge(personDTO.getAge());
            personsToSave.add(newPerson);
            addedPersonNames.add(personDTO.getFullName());
        }

        // Guarda las personas y sus habilidades
        for (int i = 0; i < personsToSave.size(); i++) {
            Person savedPerson = personRepository.save(personsToSave.get(i));

            PersonDTO personDTO = taskDTO.getPersons().get(i);

            for (SkillDTO skillDTO : personDTO.getSkills()) {
                Skill skill = new Skill();
                skill.setName(skillDTO.getName());
                skill.setPersonId(savedPerson.getId());

                skillRepository.save(skill);
            }

            personIds.add(savedPerson.getId());
        }

        taskRepository.save(task);

        for (Long personId : personIds) {
            TaskPerson taskPerson = new TaskPerson();
            taskPerson.setTaskId(task.getId());
            taskPerson.setPersonId(personId);
            taskPersonRepository.save(taskPerson);
        }

        return new HttpResponseDTO("Tarea creada con éxito");
    }

    /**
     * Obtiene una lista de tareas filtradas por estado.
     * 
     * Si el parámetro `status` es nulo, devuelve todas las tareas. Si se
     * proporciona
     * un código de estado, devuelve las tareas que coincidan con el estado
     * especificado.
     * 
     * @param status El código de estado de la tarea. Puede ser 0 (PENDING) o 1
     *               (COMPLETED). Si es nulo, se devolverán todas las tareas.
     * @return Una lista de tareas filtradas según el estado, o todas las tareas si
     *         no se proporciona un estado.
     */
    public TaskListResponse getTasks(TaskStatus status) {
        List<Task> tasks;

        if (status == null) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findByStatus(status);
        }

        List<TaskDTO> taskDTOs = tasks.stream()
                .map(task -> {
                    TaskDTO taskDTO = new TaskDTO();
                    taskDTO.setId(task.getId());
                    taskDTO.setName(task.getName());
                    taskDTO.setStatus(task.getStatus().getCode());
                    taskDTO.setLimitDate(task.getLimitDate());
                    taskDTO.setPersons(getPersonsForTask(task.getId()));

                    return taskDTO;
                })
                .collect(Collectors.toList());

        TaskListResponse response = new TaskListResponse();
        response.setData(taskDTOs);

        return response;
    }

    private List<PersonDTO> getPersonsForTask(Long taskId) {
        List<TaskPerson> taskPersons = taskPersonRepository.findByTaskId(taskId);

        return taskPersons.stream()
                .map(taskPerson -> {
                    Person person = personRepository.findById(taskPerson.getPersonId()).orElseThrow();
                    PersonDTO personDTO = new PersonDTO();
                    personDTO.setFullName(person.getFullname());
                    personDTO.setAge(person.getAge());
                    personDTO.setSkills(getSkillsForPerson(person.getId()));

                    return personDTO;
                })
                .collect(Collectors.toList());
    }

    private List<SkillDTO> getSkillsForPerson(Long personId) {
        List<Skill> skills = skillRepository.findByPersonId(personId);

        return skills.stream()
                .map(skill -> {
                    SkillDTO skillDTO = new SkillDTO();
                    skillDTO.setName(skill.getName());
                    return skillDTO;
                })
                .collect(Collectors.toList());
    }

    /**
     * Actualiza el estado de una tarea al valor proporcionado.
     *
     * @param taskDTO El DTO de la tarea que contiene el ID.
     * @param status  El nuevo estado de la tarea.
     * @throws NoSuchElementException Si no se encuentra la tarea por su ID.
     */
    public void updateTaskStatus(TaskDTO taskDTO, TaskStatus status) {
        Task task = taskRepository.findById(taskDTO.getId())
                .orElseThrow(() -> new NoSuchElementException("No se encontró la tarea con id " + taskDTO.getId()));

        task.setStatus(status);
        taskRepository.save(task);
    }
}
