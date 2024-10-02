import { inject, Injectable } from '@angular/core';
import {
  CreateTaskHttpRequest,
  GetTasksHttpResponse,
  Task,
  UpdateStatusTaskHttpRequest,
} from '../models/task.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusTaskEnum } from '../enums/status-task.enum';
import { HttpCommonResponse } from '../models/http-common.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la gestión de las tareas
 */
export class TaskService {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.httpClient = inject(HttpClient);
  }

  /**
   * URL base de la API REST
   */
  private readonly baseUrl: string;

  /**
   * Cliente HTTP para realizar peticiones
   */
  private httpClient: HttpClient;

  /**
   * Crea una tarea en la base de datos
   * @param task tarea a crear
   * @returns Observable con la respuesta del servidor
   */
  createTask(task: Task): Observable<HttpCommonResponse> {
    const httpRequest: CreateTaskHttpRequest = {
      data: task,
    };

    return this.httpClient.post<HttpCommonResponse>(this.baseUrl, httpRequest);
  }

  /**
   * Obtiene las tareas de la base de datos (opcionalmente filtrando por estado)
   * @param status filtro de tareas por estado (opcional)
   * @returns Observable con la respuesta del servidor con la lista de tareas
   */
  getTasks(status?: StatusTaskEnum): Observable<GetTasksHttpResponse> {
    let url = this.baseUrl;

    if (status != undefined) {
      url = url + "?status=" + status;
    }
    return this.httpClient.get<GetTasksHttpResponse>(url);
  }

  /**
   * Actualiza el estado de una tarea en la base de datos
   * @param task tarea a actualizar
   * @param status nuevo estado de la tarea
   * @returns Observable con la respuesta del servidor
   */
  updateStatusTask(
    task: Task,
    status: StatusTaskEnum
  ): Observable<HttpCommonResponse> {
    const httpRequest: UpdateStatusTaskHttpRequest = {
      task,
      status,
    };

    return this.httpClient.put<HttpCommonResponse>(this.baseUrl, httpRequest);
  }
}
