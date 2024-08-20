# Magneto Empleo - Jobsites Dinamicos

Este proyecto es una solución para la empresa Magneto Empleo, que consiste en un creador de páginas web drag-and-drop completamente funcional. El sistema permite a los usuarios crear y personalizar sus propias páginas web con distintos elementos, generando automáticamente el código HTML, CSS y JavaScript necesario para publicar una landing page funcional.
La idea de esta solución es reducir los tiempos que le toma a Magneto Empleo hacer cambios en las landing pages y publicarlos, reduciendo estos tiempos en casi un 60%
## Características Principales

- **Constructor Drag-and-Drop**: Los usuarios pueden arrastrar y soltar diferentes elementos para crear su página web de manera intuitiva.
- **Generación Automática de Código**: El sistema genera automáticamente el código HTML, CSS y JavaScript correspondiente, listo para ser publicado.
- **Envío a Revisión**: Los usuarios pueden enviar sus páginas web creadas a revisión.
- **Panel de Administración**: Un administrador puede revisar, aprobar, rechazar o descargar las páginas web desde un panel de administración.

## Tecnologías Utilizadas

- **Frontend**:
  - [GrapesJS](https://grapesjs.com/) - Utilizado para el editor drag-and-drop.
  - [ReactJS](https://reactjs.org/) - Usado para la construcción de la interfaz de usuario.
  - [TailwindCSS](https://tailwindcss.com/) - Utilizado para el diseño y la estilización de las páginas.

- **Backend**:
  - [Node.js](https://nodejs.org/) - Entorno de ejecución para el servidor.
  - [Express](https://expressjs.com/) - Framework para la construcción del backend.
  - [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL utilizada para almacenar datos de usuarios, páginas web y revisiones.

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/santig005/Proyecto-Jobsites-Dinamicos-Magneto.git
2. Navegar al directorio del proyecto:
  ```bash
  cd Proyecto-Jobsites-Dinamicos-Magneto
  ```
3. Instalar las dependencias del frontend:
  ```bash
  cd client
  npm install
  ```
4. Instalar las dependencias del backend:
  ```bash
  cd server
  npm install
  ```
5. Configurar las variables de entorno en un archivo .env en la carpeta backend con la conexión a la base de datos MongoDB y otras configuraciones necesarias.
  
6. Iniciar el servidor:
  ```bash
  cd backend
  npm run dev
  ```
7. Iniciar el cliente:
  ```bash
  cd client
  npm start
  ```
## Uso

- **Creación de Páginas**: Los usuarios pueden crear y personalizar páginas web utilizando la herramienta drag-and-drop.
- **Revisión y Aprobación**: Las páginas creadas pueden ser enviadas a revisión. Un administrador puede aprobar, rechazar o descargar las páginas desde el panel de administración.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-característica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Envía un push a la rama (`git push origin feature/nueva-característica`).
5. Abre un Pull Request.
