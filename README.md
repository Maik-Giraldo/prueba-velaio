# Bienvenidos a mi prueba técnica!

Este proyecto es una aplicación de gestión de tareas de desarrollo, diseñada para facilitar la asignación de tareas a personas según sus respectivas habilidades. La aplicación está desarrollada utilizando **Spring Boot** para el backend, **Angular 16** para el frontend y **MySQL** como base de datos.



## Características

-   **Gestión de Tareas**: Permite crear y listar.
-   **Asignación de Personas**: Asigna personas a las tareas que se están creando.
-   **Interfaz Intuitiva**: Un frontend moderno y responsivo para una mejor experiencia de usuario.
-   **Persistencia de Datos**: Utiliza MySQL para almacenar información de tareas, personas y habilidades.


## Tecnologías Utilizadas

-   **Backend**: Spring Boot
-   **Frontend**: Angular
-   **Base de Datos**: MySQL


## Instalación

Instrucciones sobre cómo clonar el repositorio, instalar dependencias y ejecutar la aplicación.
Se deben clonar los proyectos **Backend** , **Frontend** y **Base de datos**.
- Para el **Backend** se debe ejecutar el comando **mvn clean install** para instalar todas las dependencias y se debe iniciar el proyecto con el jar de esta manera **java -jar target/velaio-ms-tasks-0.0.1-SNAPSHOT.jar**.
- Para el **Frontend** se debe ejecutar el comando **npm i** para instalar todas las dependencias y se debe hacer hace **ng serve** para iniciar el proyecto.
- Para la base de datos, se debe ir a un motor de base de datos e importar el archivo **.sql** y ejecutarlo para su creación.

**Si se desea solamente probar el proyecto sin necesidad de ejecutarlo localmente, pueden ir a este link de producción** https://prueba-velaio.maikgiraldo.dev

## Backend Técnico

El backend de esta aplicación está desarrollado con **Spring Boot**, lo que permite una rápida creación de aplicaciones basadas en Java. Utiliza un enfoque RESTful para manejar las operaciones relacionadas con las tareas, usuarios y habilidades, facilitando la interacción con el frontend de Angular.

### Estructura del Proyecto

-   **Controladores**: Manejan las solicitudes HTTP y gestionan la lógica de negocio. Cada controlador corresponde a un recurso principal (tareas, usuarios, habilidades).
-   **Servicios**: Contienen la lógica de negocio y se comunican con los repositorios para acceder a los datos. Se encargan de la validación y procesamiento de la información antes de enviarla a los controladores.
-   **Repositorios**: Utilizan Spring Data JPA para interactuar con la base de datos MySQL. Permiten realizar operaciones CRUD de manera eficiente.
-   **DTOs**: Utilizados para transferir datos entre el frontend y el backend, asegurando que solo se envíen los datos necesarios y protegiendo la estructura interna de las entidades.
- **Enums**: Representa los diferentes estados de una tarea (Pendiente y  Completada).
- **Entidades**: Representan los modelos de datos de la aplicación.
- 
## Frontend Técnico

El frontend de esta aplicación está desarrollado con **Angular**, un framework de desarrollo de aplicaciones web que permite crear interfaces de usuario dinámicas y modernas. Utiliza un enfoque basado en componentes para facilitar la creación y mantenimiento de la interfaz.
### Estructura del Proyecto

-   **Componentes**: Cada vista de la aplicación se organiza en componentes reutilizables, lo que permite un desarrollo modular y una mejor gestión del código. Ejemplos incluyen componentes para gestionar tareas, personas y habilidades.
    
-   **Servicios**: Se encargan de la comunicación con el backend a través de solicitudes HTTP. Los servicios gestionan la lógica de negocio en el lado del cliente, como la obtención de datos.
    
-   **Modelos**: Define la estructura de los datos que se utilizan en la aplicación, incluyendo las tareas, personas y habilidades. Esto asegura que los datos sean consistentes y fáciles de manipular.
    
-   **Gestión de Estado**: Implementa servicios para gestionar el estado de la aplicación, facilitando la comunicación entre componentes y el manejo de datos compartidos.


