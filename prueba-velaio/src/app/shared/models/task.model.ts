import { FormControl } from "@angular/forms";
import { StatusTaskEnum } from "../enums/status-task.enum";
import { Person } from "./person.model";

/**
 * Información de una tarea
 */
export interface Task {
    /**
     * Identificador único de la tarea
     */
    id: number;
    /**
     * Nombre de la tarea
     */
    name: string;
    /**
     * Fecha límite de finalización de la tarea
     */
    limit_date: string;
    /**
     * Estado de la tarea
     */
    status: StatusTaskEnum;
    /**
     * Personas que deben realizar la tarea
     */
    persons: Person[];
}

/**
 * Http request para crear una tarea
 */
export interface CreateTaskHttpRequest {
    data: Task;
}

/**
 * Http response al obtener las tareas
 */
export interface GetTasksHttpResponse {
    /**
     * Tareas obtenidas de la base de datos
     */
    data: Task[];
}

/**
 * Http request para actualizar el estado de una tarea
 */
export interface UpdateStatusTaskHttpRequest {
    /**
     * Tarea a actualizar
     */
    task: Task;
    /**
     * Nuevo estado de la tarea
     */
    status: StatusTaskEnum;
}

/**
 * Evento que se emite cuando se cambia el estado de una tarea
 */
export interface OnChangeStatusTask {
    /**
     * Nuevo estado de la tarea
     */
    status: StatusTaskEnum;
    /**
     * Tarea a actualizar
     */
    task: Task;
}

/**
 * Formulario de persona para crear una tarea
 */
export interface CreateTaskPersonForm {
    /**
     * Nombre completo de la persona
     */
    full_name: FormControl<string | null>;
    /**
     * Edad de la persona
     */
    age: FormControl<number | null>;
    /**
     * Habilidades de la persona
     */
    skills: FormControl<string | null>[];
}

/**
 * Formulario para crear una tarea
 */
export interface CreateTaskForm {
    /**
     * Nombre de la tarea
     */
    name: FormControl<string | null>;
    /**
     * Fecha límite de finalización de la tarea
     */
    limit_date: FormControl<string | null>;
    /**
     * Personas que deben realizar la tarea
     */
    persons: CreateTaskPersonForm[];
}