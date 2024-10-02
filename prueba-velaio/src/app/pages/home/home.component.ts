import { NgFor, NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { DialogService } from "@ngneat/dialog";
import { CardTaskComponent } from "src/app/shared/components/card-task/card-task.component";
import { CreateTaskComponent } from "src/app/shared/components/create-task/create-task.component";
import { DropdownComponent } from "src/app/shared/components/dropdown/dropdown.component";
import { StatusTaskEnum } from "src/app/shared/enums/status-task.enum";
import { DropdownOption } from "src/app/shared/models/dropdown.model";
import { OnChangeStatusTask, Task } from "src/app/shared/models/task.model";
import { NotificationService } from "src/app/shared/services/notification.service";
import { TaskService } from "src/app/shared/services/task.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
    imports: [
        DropdownComponent,
        CardTaskComponent,
        NgIf,
        NgFor,
        CreateTaskComponent
    ]
})
export class HomeComponent implements OnInit {
    constructor() {
        this.taskService = inject(TaskService);
        this.dialogService = inject(DialogService);
        this.notificationService = inject(NotificationService);

        this.filterStatusOptions = [
            {
                name: "Todas",
                value: "",
            },
            {
                name: "Completadas",
                value: StatusTaskEnum.COMPLETED,
            },
            {
                name: "Pendientes",
                value: StatusTaskEnum.PENDING,
            },
        ];

        this.tasks = [];
    }

    /**
     * Servicio para la gestión de las tareas
     */
    private taskService: TaskService;

    /**
     * Servicio para la gestión de diálogos
     */
    private dialogService: DialogService;

    /**
     * Servicio para la gestión de notificaciones
     */
    private notificationService: NotificationService;

    /**
     * Filtro de tareas por estado (opcional si se selecciona alguno)
     */
    private filterStatusTask: StatusTaskEnum | undefined;

    /**
     * Tareas obtenidas de la base de datos
     */
    tasks: Task[];

    /**
     * Opciones de filtro de status de las tareas
     */
    filterStatusOptions: DropdownOption[];

    ngOnInit(): void {
        this.getTasks();
    }

    /**
     * Evento que se emite cuando se selecciona una opción del filtro de status
     * @param option opción seleccionada
     */
    onSelectFilterStatus(option: DropdownOption) {
        if (!option) {
            this.filterStatusTask = undefined;
        }else{
            this.filterStatusTask = option.value as StatusTaskEnum;
        }

        this.getTasks();
    }

    /**
     * Obtiene las tareas de la base de datos (opcionalmente filtrando por estado)
     */
    getTasks() {
        this.taskService.getTasks(this.filterStatusTask).subscribe({
            next: (response) => {
                this.tasks = response.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    /**
     * Evento que se emite cuando se cambia el estado de una tarea
     * @param event evento con el nuevo estado de la tarea y la tarea a actualizar
     */
    onChangeStatusTask(event: OnChangeStatusTask) {
        this.taskService.updateStatusTask(event.task, event.status).subscribe({
            next: (response) => {
                this.notificationService.notify(response.message, "success");
            },
            error: (error) => {
                console.error(error);

                this.notificationService.notify(error.error.message, "failure");
            },
        });
    }

    /**
     * Abre el dialogo de creación de tarea
     */
    createTask() {
        const dialog = this.dialogService.open(CreateTaskComponent, {
            closeButton: true,
            backdrop: true,
        });

        dialog.afterClosed$.subscribe((created: boolean | undefined) => {
            if (!created) {
                return;
            }

            this.getTasks();
        });
    }
}
