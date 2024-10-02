import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DropdownOption } from "../../models/dropdown.model";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.css"],
    standalone: true,
    imports: [NgIf, NgFor],
})
export class DropdownComponent {
    constructor() {
        this.isOpen = false;

        this.currentOption = undefined;
        this.options = [];
    }

    /**
     * Indica si el dropdown está abierto
     */
    isOpen: boolean;

    /**
     * Título del dropdown
     */
    currentOption: DropdownOption | undefined;

    /**
     * Opciones del dropdown
     */
    @Input() options: DropdownOption[];

    /**
     * Evento que se emite cuando se selecciona una opción
     */
    @Output() onSelectOption = new EventEmitter<DropdownOption>();

    /**
     * Emite un evento cuando se selecciona una opción
     * @param option opción seleccionada
     */
    selectOption(option: DropdownOption) {
        if (option.value !== this.currentOption?.value) {
            this.currentOption = option;            
            this.onSelectOption.emit(option);
        }
        
        this.isOpen = false;
    }
}