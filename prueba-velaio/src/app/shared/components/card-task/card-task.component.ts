import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RandomBgColorPipe } from "../../pipes/random-bg-color.pipe";
import { OnChangeStatusTask, Task } from "../../models/task.model";
import { StatusTaskEnum } from "../../enums/status-task.enum";

@Component({
    selector: "app-card-task",
    templateUrl: "./card-task.component.html",
    styleUrls: ["./card-task.component.css"],
    standalone: true,
    imports: [NgIf, NgFor, RandomBgColorPipe],
})
export class CardTaskComponent {
    constructor() {
        this.skillsColors = [
            "#216e4e",
            "#7f5f01",
            "#702e00",
            "#a54800",
            "#ae2e24",
            "#352c63",
            "#0055cc",
        ];
        
        this.onStatusChange = new EventEmitter<OnChangeStatusTask>();
        this.StatusTaskEnum = StatusTaskEnum;
    }

    /**
     * Tarea a mostrar en la tarjeta
     */
    @Input() task: Task | undefined;

    /**
     * Evento que se emite cuando se cambia el estado de la tarea
     */
    @Output() onStatusChange: EventEmitter<OnChangeStatusTask>;

    /**
     * Estados de tarea disponibles
     */
    StatusTaskEnum: typeof StatusTaskEnum;

    /**
     * Colores de las habilidades de una tarea disponibles
     */
    skillsColors: string[];

    /**
     * Emite un evento cuando se cambia el estado de la tarea
     * @param
     */
    changeStatus(task: Task) {
        const event: OnChangeStatusTask = {
            status:
                task.status == StatusTaskEnum.COMPLETED
                    ? StatusTaskEnum.PENDING
                    : StatusTaskEnum.COMPLETED,
            task,
        };

        task.status = event.status;
        this.onStatusChange.emit(event);
    }
}
