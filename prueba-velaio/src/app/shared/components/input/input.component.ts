import { NgIf } from "@angular/common";
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Self,
    ViewChild,
} from "@angular/core";
import {
    ControlValueAccessor,
    FormsModule,
    NgControl,
    ReactiveFormsModule,
} from "@angular/forms";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.css"],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf],
})
export class InputComponent implements ControlValueAccessor {
    constructor(@Self() public controlDir: NgControl) {
        this.disabled = false;
        this.blur = new EventEmitter<void>();
        this.onChange = (_: any) => {};
        this.onTouched = () => {};
        controlDir.valueAccessor = this;
        this.placeholder = "";
        this.type = "text";
    }

    /**
     * Input con el cual se vincula el componente
     */
    @ViewChild("input") input: ElementRef<HTMLInputElement> | undefined;

    /**
     * Input date para adaptar el formato de la fecha y mostrar un picker
     */
    @ViewChild("inputDate") inputDate: ElementRef<HTMLInputElement> | undefined;

    /**
     * Texto que se mostrara como placeholder del input
     */
    @Input() placeholder: string;

    /**
     * Tipo de input que se va a mostrar
     */
    @Input() type: HTMLInputElement["type"];

    /**
     * Indica si el input esta deshabilitado o no
     */
    disabled: boolean;

    ngOnInit() {}

    /**
     * Método que se encarga de escribir el valor en el input y de emitir el evento de cambio
     */
    onChange: (value: any) => void;

    /**
     * Método que se encarga de emitir el evento de cambio
     */
    onTouched: () => void;

    /**
     * Evento que se emite cuando el input envíia un evento de blur
     */
    @Output() blur: EventEmitter<void>;

    /**
     * Método que se encarga de escribir el valor en el input
     * @param value Valor que se va a escribir en el input
     */
    writeValue(value: any): void {
        if (this.input && value) {
            if (this.type == "date") {
                const date = new Date(value);
                const dateValue = `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${date
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;

                this.input.nativeElement.value = dateValue;
                this.onChange(dateValue);
                return;
            }

            this.input.nativeElement.value = value;
            this.onChange(value);
        }
    }

    /**
     * Método que emite el evento click del input
     */
    onClick(): void {
        if (this.type == "date") {
            this.inputDate?.nativeElement.showPicker();
        }
    }

    /**
     * Método que registra el evento de cambio de valor
     * @param onChange Método que se va a registrar como callback del evento de cambio
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Método que registra el evento de blur
     * @param onTouched Método que se va a registrar como callback del evento de blur
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * Método que asigna el estado de deshabilitado al input
     * @param disabled 
     */
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
