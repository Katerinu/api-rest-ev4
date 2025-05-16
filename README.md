# Codelsoft Express API
Este repositorio contiene el monolito modular que fue solicitado para la evaluación. Contiene las operaciones CRUD para un sistema de gestion de productos.

## Pre-requisitos
- [Node.js](https://nodejs.org/es/) (version 22.14.0)
- Mas adelante se explicara como instalar por medio de Docker, en caso de necesitar otra forma estas son las versiones utilizadas.
- [MongoDB](https://www.mongodb.com/try/download/community) (version 7.0.5)

## Instalación y configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/Katerinu/api-rest-ev4.git
```

2. **Ingresar al directorio del proyecto**
```bash
cd api-rest-ev4
```

3. **Instalar las dependencias**
```bash
npm install
```

4. **Crear un archivo `.env` en la raíz del proyecto y ingresar las variables de entorno**
```bash
cp .env.example .env
```

5. **Instalación de Imagenes de docker**
```bash
docker compose up -d
```
Se debe asegurar de haber instalado las imagenes de Docker y ademas de haber creado correctamente su .env

## Ejecutar la aplicación
```bash
npm run start
```
El servidor se iniciará en el puerto **3000** (o en el puerto definido en la variable de entorno `PORT`). Accede a la API mediante `http://localhost:3000`.

## Ejecutar la aplicación en entorno de desarrollo
```bash
npm run dev
```
Si se deseara se puede levantar el servidor en entorno de desarrollo, el servidor estara en el mismo puerto definido en la variable de entorno `PORT` en forma de desarrollo usando Nodemon.

## Seeder
Para poblar la base de datos con datos de prueba generados de manera al azar, ejecuta el siguiente comando:
```bash
npm run seed
```

## Autores
- [@Katerinu](https://www.github.com/Katerinu)