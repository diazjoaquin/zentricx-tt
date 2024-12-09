# zentricx - Challenge Técnico

## Proyecto de Gestión de Tareas
Este proyecto es una aplicación para gestionar tareas, que permite a los usuarios crear, actualizar, eliminar y visualizar tareas, todo ello protegido por autenticación. El backend está desarrollado con NestJS, mientras que el frontend está implementado en la última versión de Next.js. Para manejar los estados de manera global se utilizaron custom hooks (Componentes perzonalizados) y ContextHooks debido a la simpleza del proyecto.

## Tecnologías Utilizadas
* Backend: NestJS (Node.js Framework)
* Frontend: Next.js
* Base de Datos: PostgreSQL
* Autenticación: JWT (JSON Web Token)
* Contenedores: Docker

## Requisitos Previos

_para ejecutar ésta aplicación necesitas tener previamente instalado:_

* Docker desktop.
* Node.js (Version 16.0 o superior)
* Git

## Instrucciones de Configuración

### Clonar el repositorio.
```bash
git clone https://github.com/diazjoaquin/zentricx-tt.git
cd zentricx-tt
code .
```
### Backend (Nest.js)
#### Instalacion de dependencias
----

```bash
cd api
npm install
```

### Configuración del archivo .env
En la carpeta api crea un archivo .env a partir del archivo .env.dist y asignale los valores apropiados a cada variable de entorno.

#### Levanta el proyecto con docker.
El backend esta configurado para levantarse con Docker. Para levantarlo utiliza el siguiente comando:

```bash
docker-compose up -d
```

Esto iniciará el contenedor con la base de datos postgreSQL. Una vez levantado el contenedor deberás utilizar el siguiente comando:

```bash
npm run start:dev
```
Esto iniciará el contenedor con la base de datos PostgreSQL y el backend de NestJS.

____

### Front-End (Next.js)
#### Instalacion de dependencias
----
Desde la carpeta raíz:
```bash
cd ui
npm install
```

#### Configuración del archivo .env
Crea un archivo .env en la carpeta frontend con el siguiente contenido:
```bash
CYPRESS_API_URL_PREFIX=http://localhost:5000/api/v1
CYPRESS_BASE_URL_PREFIX=http://localhost:3000
```
En mi caso el backend esta levantado en el PORT: 5000, si lo levantas en un puerto distinto deberías mofificar la variable de entorno con el puerto seleccionado.

### Base de datos
La base de datos PostgreSQL está incluida en el archivo docker-compose.yml. Cuando ejecutes docker-compose up, se creará automáticamente una base de datos llamada projects_db.

Para acceder a la base de datos, puedes usar pgAdmin o cualquier otra herramienta de administración de PostgreSQL con las credenciales definidas en el archivo .env.

### Endpoinst de la API.
La API está protegida con autenticación JWT. A continuación, se muestra una lista de los endpoints disponibles:

#### Tareas
**POST /task:** Crear una nueva tarea.<br>
**PUT /task/{id}:** Actualizar una tarea del usauario.<br>
**DELETE /task/{id}:** Elimina una tarea del usuario.<br>
**GET /task/user/:userId:** Obtener tareas creadas por el usuario actual.<br>
**GET /task/:id/user/:userId:** Obtener una tarea específica mediante el id creada por el usuario actual.<br>

#### Autenticación
Para autenticar usuarios, se debe utilizar JWT. El backend cuenta con los siguientes endpoints de autenticación:<br>

**POST /auth/register:** Registrar un nuevo usuario.<br>
**POST /auth/login:** Iniciar sesión y obtener un token JWT.<br>
El token JWT debe ser incluido en los headers de las solicitudes como access_token para acceder a los endpoints protegidos.

# ¿Por qué elegí NestJS sobre Express o Python?
1. Estructura Escalable y Modular
NestJS proporciona una arquitectura modular basada en clases y decoradores que permite dividir el proyecto en módulos fácilmente reutilizables y escalables. Esto es especialmente útil en aplicaciones de mayor tamaño, ya que facilita la organización del código y mejora su mantenibilidad a largo plazo.

Aunque Express es más flexible y minimalista, al no tener una arquitectura tan estricta como NestJS, se vuelve más difícil mantener y escalar aplicaciones grandes. Por otro lado, los frameworks de Python como Flask y Django también ofrecen buenas soluciones, pero NestJS tiene la ventaja de ser una herramienta nativa de JavaScript/TypeScript, lo que proporciona una experiencia más fluida para mi que trabajo principalmente en éste ecosistema.

2. Integración Nativa con TypeScript
NestJS está escrito en TypeScript de manera nativa, lo que permite disfrutar de las ventajas del tipado estático. Esto mejora la calidad del código y facilita el desarrollo, evitando errores comunes que podrían surgir con JavaScript puro. Mientras que Express puede ser usado con TypeScript, NestJS tiene un mejor soporte de principio a fin, lo que hace que el proceso de desarrollo sea más robusto y seguro.

3. Funciones Avanzadas Integradas
NestJS proporciona de forma nativa funcionalidades como Guards, Pipes e Interceptors que permiten manejar de manera eficiente temas como la autenticación, validación de datos y manejo de excepciones. Esto elimina la necesidad de configurar manualmente muchas de las características que se tendrían que hacer en Express.

## Elección de la Arquitectura Hexagonal para el Backend
La arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores, fue seleccionada para este proyecto debido a sus dos grandes ventajas:

1. Facilidad para Implementar Nuevos Requisitos
Al utilizar la arquitectura hexagonal, es fácil agregar nuevas funcionalidades o adaptadores sin modificar el núcleo del sistema. Si en el futuro se necesita integrar una nueva fuente de datos o un sistema de notificaciones, se puede hacer sin afectar la lógica de negocio central. Solo se tendría que agregar un nuevo adaptador para interactuar con el nuevo sistema, manteniendo todo lo demás intacto.

2. Al utilizar una arquitectura bien definida como la hexagonal, la separación entre la lógica de negocio y las interfaces externas ayuda a mantener el código más limpio y comprensible. La organización de la aplicación en módulos o capas (como el núcleo de negocio y los adaptadores) hace que el código sea más fácil de entender, mejorando la mantenibilidad a largo plazo.

3. Familiaridad con la Arquitectura
Además de sus beneficios inherentes, la arquitectura hexagonal fue una elección natural para este proyecto, ya que ya la utilizo en mi trabajo diario. Estoy familiarizado con sus principios y prácticas, lo que me permite aplicar de manera más eficiente sus ventajas, como el desacoplamiento, y la escalabilidad. Esta experiencia previa me permitió implementar rápidamente una solución robusta y flexible, asegurando que el proyecto se desarrolle de manera organizada y estructurada.

# Front-End: Patrones y Estrategias Utilizadas
Para la construcción del front-end, se ha utilizado una serie de patrones y estrategias que facilitan el desarrollo y mantenimiento de la aplicación. Aunque no se sigue una arquitectura formal, la organización y estructura empleada permite un desarrollo más ágil y escalable.

1. Composición Basada en Componentes
La interfaz de usuario se organiza utilizando la arquitectura basada en componentes de React. Cada parte de la UI se encapsula en un componente reutilizable, lo que facilita la gestión del código y su mantenimiento a largo plazo.

2. Gestión del Estado con Context y Custom Hooks
En lugar de usar un gestor de estados globales como Redux, se optó por el uso de React Context y custom hooks. Este enfoque simplifica el flujo de datos y reduce la complejidad, permitiendo una gestión más directa y sencilla del estado global sin necesidad de librerías adicionales. Se utiliza el contexto para manejar la autenticación del usuario, el estado de las notificaciones, entre otros.

3. Organización Modular por Funcionalidades
La estructura de carpetas se basa en funcionalidades, lo que significa que cada característica del sistema (como la gestión de tareas o la autenticación) se agrupa en su propia carpeta con componentes, hooks y servicios relacionados. Esto permite una mayor escalabilidad y facilidad para agregar nuevas funcionalidades sin interferir con otras partes del proyecto.

4. Optimización de la Carga de Componentes
Se implementa code splitting para mejorar el rendimiento de la aplicación, cargando solo los componentes necesarios en el momento en que se requieren.

5. Manejo de Formularios con Formik
Para simplificar la gestión de formularios, se utiliza Formik, lo que permite manejar validaciones, envío de datos y el estado del formulario de manera centralizada. Esto facilita la creación de formularios complejos sin necesidad de escribir código repetitivo.
