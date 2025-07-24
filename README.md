
# El Buen Sabor – Dashboard Administrativo

Panel administrativo para la gestión interna del sistema de El Buen Sabor, desarrollado en **React + TypeScript**, con integración a un backend en Spring Boot y autenticación a través de **Auth0**.

---

## 📦 Estructura del Proyecto

```

el-buen-sabor-dashboard
├─ src
│  ├─ api                # Llamadas HTTP agrupadas por entidad (empleados, insumos, roles, etc.)
│  ├─ components         # Componentes reutilizables del sistema
│  │  ├─ auth            # Componentes relacionados con autenticación (login, rutas protegidas)
│  │  ├─ dashboard       # Widgets del panel principal
│  │  ├─ employees       # Modales de gestión de empleados y roles
│  │  ├─ layout          # Estructura general de la interfaz (Sidebar, Header, etc.)
│  │  ├─ products        # Modales de productos y subcategorías
│  │  ├─ supplies        # Modal de insumos
│  │  └─ ui              # Componentes visuales reutilizables (Input, Button, etc.)
│  ├─ context            # Contextos globales (Auth)
│  ├─ pages              # Vistas principales del sistema (Dashboard, Pedidos, Productos, etc.)
│  ├─ routes             # Ruteo principal de la aplicación
│  ├─ store              # Zustand store para manejo de sesión
│  ├─ types              # Definiciones de tipos (TypeScript)
│  ├─ utils              # Funciones auxiliares

````

---

## 🚀 Tecnologías

- **React + Vite**
- **TypeScript**
- **TailwindCSS**
- **Zustand** para gestión de estado
- **Axios** para consumo de API
- **Auth0** para autenticación de usuarios
- **Spring Boot** como backend REST

---

## 🔐 Variables de entorno

El archivo `.env` define las siguientes variables:

```env
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_CALLBACK_URL=
VITE_AUTH0_AUDIENCE=
VITE_API_SERVER_URL=
````

Estas variables configuran la autenticación con Auth0 y el punto de acceso al backend. No se deben incluir valores sensibles directamente en este archivo si se versiona.

---

## ✅ Funcionalidades implementadas

* **Login / Logout** con Auth0 y protección de rutas según sesión.
* **Dashboard** con estadísticas y pedidos recientes.
* **Gestión de insumos**:

  * Alta, modificación, y baja lógica.
  * Integración con categorías jerárquicas.
  * Validación de precios según si es insumo para elaborar.
* **Gestión de productos**:

  * Productos manufacturados con insumos asociados.
  * Subcategorías de producto.
  * Upload y preview de imágenes.
* **Gestión de empleados**:

  * Alta / edición con asignación de roles.
* **Gestión de roles**:

  * ABM de roles con `auth0RoleId`.
  * Actualización inmediata en frontend sin recargar desde el backend.

---

## 🛠️ Scripts útiles

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Compilar build de producción
npm run build

# Formatear código
npm run format

# Lint del proyecto
npm run lint
```

---

## ✍️ Estilo de desarrollo

* Código dividido por dominio (empleados, insumos, productos).
* Reutilización de componentes UI básicos (`Input`, `Button`, `Card`, etc.).
* Manejo centralizado de errores y validaciones en formularios.
* Separación entre lógica de presentación (modales) y llamadas al backend (`api/`).

---

## 📁 Backend

Este panel se comunica con un backend REST expuesto por Spring Boot (puerto `8080`). Algunos endpoints clave:

* `GET /api/admin/users`
* `GET /api/admin/roles`
* `GET /articuloInsumo/listar`
* `POST /images/uploadToEntity`
* entre otros...

---

## 🔐 Seguridad

La autenticación se realiza mediante Auth0, con validación de roles para proteger vistas sensibles. El token de acceso se obtiene silenciosamente y se inyecta en cada request con Axios desde `apiClient.ts`.

---


## 🧑‍💻 Autor

El Buen Sabor - P.E.C.
© 2025

