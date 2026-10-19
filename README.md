# TaskCampus

TaskCampus es una aplicación web desarrollada con React y Vite que permite organizar tareas académicas de forma sencilla.

## Funcionalidades

- Visualizar tareas desde una API.
- Crear nuevas tareas.
- Editar títulos de tareas.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas con confirmación.
- Buscar tareas por título.
- Filtrar tareas por estado.
- Visualizar un resumen de tareas totales, pendientes y completadas.
- Navegar entre las vistas de resumen, tareas y creación de tareas.

## Tecnologías utilizadas

- React
- JavaScript
- CSS
- Vite
## Instalación y ejecución

**1. Clonar el repositorio**

```bash
git clone https://github.com/jpoturob/taskcampus.git
```

**2. Entrar en la carpeta del proyecto**

```bash
cd taskcampus
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Ejecutar la aplicación**

```bash
npm run dev
```

Luego, abrir en el navegador la dirección local que muestra la terminal.

## Estructura del proyecto

- `src/components/`: componentes de la interfaz.
- `src/hooks/`: lógica reutilizable para gestionar tareas.
- `src/services/`: funciones para comunicarse con la API.
- `src/App.jsx`: componente principal de la aplicación.
- `src/App.css`: estilos de la aplicación.

## API y persistencia

La aplicación utiliza JSONPlaceholder para cargar y gestionar tareas mediante solicitudes HTTP.

Esta API simula las operaciones de creación, edición y eliminación. Por ello, los cambios realizados no se guardan permanentemente y las tareas pueden volver a su estado original al recargar la página.

## Prueba de compilación

Para comprobar que el proyecto compile correctamente, ejecutar:

```bash
npm run build
```

## Repositorio

https://github.com/jpoturob/taskcampus.git

