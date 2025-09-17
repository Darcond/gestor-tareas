# Gestor de Tareas

Gestor de Tareas es una aplicación web para administrar tareas personales o de equipo. Permite crear, actualizar, eliminar y filtrar tareas por estado y prioridad. Además, cuenta con un sistema de autenticación de usuarios con roles.

---

## Características

- Registro e inicio de sesión de usuarios.
- Gestión de tareas: crear, actualizar estado, eliminar.
- Filtros por estado y prioridad.
- Actualización en tiempo real de tareas sin recargar la página.
- Validaciones en frontend y backend para asegurar datos correctos.
- Roles de usuario: cada tarea pertenece al usuario que la creó.

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Jest y Supertest para pruebas unitarias
- Nodemon para desarrollo

### Frontend

- React
- React Router DOM
- Axios para comunicación con el backend
- HTML, CSS y JavaScript

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Darcond/gestor-tareas.git
cd gestor-tareas
```

2. Instalar dependencias del backend:

```bash
cd backend
npm install
```

3. Crear archivo `.env` en `backend` con las variables:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/gestortareas
JWT_SECRET=tu_secreto
```

4. Ejecutar el backend:

```bash
npm run dev
```

5. Instalar dependencias del frontend:

```bash
cd ../frontend
npm install
```

6. Ejecutar el frontend:

```bash
npm run dev
```

---

## Uso

1. Abrir el navegador en `http://localhost:5173` (o el puerto que indique Vite).
2. Registrarse o iniciar sesión.
3. Crear nuevas tareas usando el formulario.
4. Actualizar estados, eliminar o filtrar tareas.
5. Cerrar sesión con el botón en la pantalla de tareas.

---

## Pruebas unitarias (opcional)

Para correr pruebas en backend:

```bash
cd backend
npm test
```

---

## Licencia

Este proyecto está bajo la licencia MIT.

