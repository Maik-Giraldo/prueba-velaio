import {
    ApplicationConfig,
    importProvidersFrom
} from "@angular/core";
import {
    PreloadAllModules,
    provideRouter,
    withPreloading,
} from "@angular/router";
import { providers } from "./app.providers";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(providers),
        provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
};
