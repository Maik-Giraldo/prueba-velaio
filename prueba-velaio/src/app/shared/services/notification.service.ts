import { Injectable } from "@angular/core";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Injectable({
    providedIn: "root",
})
/**
 * Servicio para la gestión de notificaciones
 */
export class NotificationService {
    constructor() {}

    /**
     * Notificación con un mensaje y tipo de notificación
     * @param message mensaje de la notificación
     * @param type tipo de notificación
     */
    notify(message: string, type: 'info' | 'success' | 'failure') {
        switch (type) {
            case 'info':
                Notify.info(message);
                break;
            case 'success':
                Notify.success(message);
                break;
            case 'failure':
                Notify.failure(message);
                break;
        }
    }
}