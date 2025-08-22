# 🛒 Tienda Virtual con Catálogo, Login y Administración de Usuarios

Este proyecto es una **tienda virtual** desarrollada para ofrecer un catálogo de productos, con funcionalidades de **login**, **administración de usuarios** y un **carrito de compras** totalmente interactivo.  
Incluye un **dashboard personalizado** para cada usuario, donde puede administrar su cuenta, pedidos y preferencias.

---

## 📌 Características principales

- **Catálogo de productos** con categorías, imágenes, precios y descripciones.
- **Registro e inicio de sesión** para clientes.
- **Autenticación de usuarios** y manejo de sesiones.
- **Carrito de compras** con la posibilidad de añadir, eliminar y modificar cantidades.
- **Módulo "Mi Cuenta"** para que el usuario vea y administre:
  - Información personal.
  - Historial de compras.
  - Preferencias de cuenta.
- **Panel de administración** para:
  - Crear, editar y eliminar usuarios.
  - Gestionar roles (usuario y administrador).
  - Controlar el inventario de productos.
- **Menú principal** con acceso rápido a:
  - Inicio
  - Catálogo
  - Carrito
  - Mi Cuenta
- **Interfaz moderna y responsive** para adaptarse a dispositivos móviles, tabletas y escritorios.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Bootstrap para el diseño responsivo).
- ** Node.js 
- **Base de datos**: MongoDB
- **Control de versiones**: Git y GitHub
- **Autenticación**: JWT / Firebase Auth *(dependiendo de implementación)*
- **Estilo UI**: Bootstrap 5 / CSS personalizado

---

## 📂 Estructura del proyecto
TIENDA_TENDER_JS/
│
├── backend/
│ ├── models/
│ │ └── User.js # Modelo de datos del usuario
│ └── server.js # Servidor Node.js y configuración de rutas
│
├── images/ # Imágenes del catálogo y recursos gráficos
│
├── node_modules/ # Dependencias instaladas por npm
│
├── .env # Variables de entorno (configuración)
├── index.html # Página principal del frontend
├── package.json # Configuración del proyecto y dependencias
├── package-lock.json # Bloqueo de versiones de dependencias
├── script.js # Lógica de interacción del frontend
└── styles.css # Estilos de la interfaz
