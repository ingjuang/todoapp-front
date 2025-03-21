# Todo App Frontend

Este es el proyecto frontend de una aplicación de lista de tareas (Todo App) construida con Angular.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) (versión 10 o superior)
- [Angular CLI](https://angular.io/cli) (versión 19 o superior)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ingjuang/todoapp-front.git
   cd todo-app-front
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Ejecución

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:
```bash
ng serve -o
```

Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador en `http://localhost:4200`.

## Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
```bash
ng test
```

Esto ejecutará las pruebas utilizando [Karma](https://karma-runner.github.io/) y [Jasmine](https://jasmine.github.io/).

## Librerías Utilizadas

El proyecto utiliza las siguientes librerías:

- **Angular**: Framework principal para construir la aplicación.
- **Bootstrap**: Framework CSS para el diseño y la maquetación.
- **FontAwesome**: Iconos vectoriales y fuentes.
- **Crypto-JS**: Librería para criptografía y generación de HMAC.
- **Ngx-Spinner**: Componente para mostrar un spinner de carga.
- **Ngx-Toastr**: Componente para mostrar notificaciones tipo toast.

