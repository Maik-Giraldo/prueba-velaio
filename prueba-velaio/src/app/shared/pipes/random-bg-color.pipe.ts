import { Pipe } from "@angular/core";

@Pipe({
    name: "randomBgColor",
    standalone: true,
})
/**
 * Pipe que devuelve un color aleatorio de un array de colores
 */
export class RandomBgColorPipe {
    transform(value: string[]): string {
        const randomIndex = Math.floor(Math.random() * value.length);

        return value[randomIndex];
    }
}