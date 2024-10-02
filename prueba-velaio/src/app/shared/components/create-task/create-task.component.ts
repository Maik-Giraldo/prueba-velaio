import { NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogRef } from "@ngneat/dialog";
import { StatusTaskEnum } from "../../enums/status-task.enum";
import { minDateNowValidator } from "../../form-validators/min-date-now.validator";
import {
    CreateTaskForm,
    CreateTaskPersonForm,
    Task,
} from "../../models/task.model";
import { NotificationService } from "../../services/notification.service";
import { TaskService } from "../../services/task.service";
import { InputComponent } from "../input/input.component";

@Component({
    selector: "app-create-task",
    templateUrl: "./create-task.component.html",
    styleUrls: ["./create-task.component.css"],
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, NgFor, NgIf],
})
export class CreateTaskComponent {
    constructor() {
        this.formBuilder = inject(FormBuilder);
        this.notificationService = inject(NotificationService);
        this.taskService = inject(TaskService);
        this.dialogService= inject(DialogRef)

        this.mainForm = {
            name: this.formBuilder.control("", [Validators.required]),
            limit_date: this.formBuilder.control("", [
                Validators.required,
                minDateNowValidator(),
            ]),
            persons: [
                {
                    full_name: this.formBuilder.control("", [
                        Validators.required,
                        Validators.minLength(5),
                    ]),
                    age: this.formBuilder.control(null, [
                        Validators.required,
                        Validators.min(18),
                    ]),
                    skills: [this.formBuilder.control("", [Validators.required])],
                },
            ],
        };
    }

    /**
     * Constructor para crear formularios
     */
    private formBuilder: FormBuilder;

    /**
     * Servicio para gestionar notificaciones
     */
    private notificationService: NotificationService;

    /**
     * Servicio para gestionar tareas
     */
    private taskService: TaskService;

    /**
     * Servicio para gestionar diálogos
     */
    private dialogService: DialogRef;

    /**
     * Formulario principal para crear la tarea
     */
    mainForm: CreateTaskForm;

    /**
     * Elimina una habilidad de una persona
     * @param person Persona a la que se debe de eliminar la habilidad
     * @param index Índice de la habilidad a eliminar
     */
    removePersonSkill(person: CreateTaskPersonForm, index: number) {
        if (person.skills.length === 1) {
            this.notificationService.notify(
                "La persona debe de tener al menos una habilidad",
                "failure"
            );
            return;
        }

        person.skills.splice(index, 1);
    }

    /**
     * Añade una habilidad a una persona
     * @param person Persona a la que se debe de añadir una habilidad
     */
    addPersonSkill(person: CreateTaskPersonForm) {
        person.skills.push(this.formBuilder.control("", [
            Validators.required
        ]));
    }

    /**
     * Añade una persona a la tarea
     */
    addPerson() {
        this.mainForm.persons.push({
            full_name: this.formBuilder.control("", [
                Validators.required,
                Validators.minLength(5),
            ]),
            age: this.formBuilder.control(null, [
                Validators.required,
                Validators.min(18),
            ]),
            skills: [this.formBuilder.control("", [Validators.required])],
        });
    }

    /**
     * Elimina una persona de la tarea
     * @param index Índice de la persona a eliminar
     */
    removePerson(index: number) {
        if (this.mainForm.persons.length === 1) {
            this.notificationService.notify(
                "La tarea debe de tener al menos una persona",
                "failure"
            );
            return;
        }

        this.mainForm.persons.splice(index, 1);
    }

    /**
     * Crea la tarea en la base de datos
     */
    createTask() {
        const showNotification = () => {
            this.notificationService.notify(
                "Por favor, rellena correctamente todos los campos",
                "failure"
            );
        };

        let formInvalid = false;
        let nameRepeated: string | null = null;

        if (this.mainForm.name.invalid) {
            formInvalid = true;
            this.mainForm.name.markAsTouched();
        }

        if (this.mainForm.limit_date.invalid) {
            formInvalid = true;
            this.mainForm.limit_date.markAsTouched();
        }

        for (const [index, person] of this.mainForm.persons.entries()) {
            for (const [index2, person2] of this.mainForm.persons.entries()) {
                if (index == index2) {
                    continue;
                }
                
                if (person.full_name.value == person2.full_name.value) {
                    formInvalid = true;
                    nameRepeated = person.full_name.value;
                    break;
                }
                
            }

            if (person.full_name.invalid) {
                formInvalid = true;
                person.full_name.markAsTouched();
            }

            if (person.age.invalid) {
                formInvalid = true;
                person.age.markAsTouched();
            }

            for (const skill of person.skills) {
                if (skill.invalid) {
                    formInvalid = true;
                    skill.markAsTouched();
                }
            }
        }

        if (nameRepeated) {
            this.notificationService.notify(
                `La persona '${nameRepeated}' se encuentra repetida en la tarea`,
                "failure"
            );
            return;
        }

        if (formInvalid) {
            showNotification();
            return;
        }

        const request: Task = {
            id: -1,
            name: this.mainForm.name.value!,
            limit_date: this.mainForm.limit_date.value!,
            persons: this.mainForm.persons.map((person) => {
                return {
                    id: -1,
                    full_name: person.full_name.value!,
                    age: person.age.value!,
                    skills: person.skills.map((skill) => {
                        return {
                            id: -1,
                            name: skill.value!,
                        };
                    }),
                };
            }),
            status: StatusTaskEnum.PENDING,
        };

        this.taskService.createTask(request).subscribe({
            next: (response) => {
                this.notificationService.notify(response.message, "success");
                
                this.dialogService.close(true);
            },
            error: (error) => {
                console.error(error);

                this.notificationService.notify(error.error.message, "failure");
            },
        });
    }
}
