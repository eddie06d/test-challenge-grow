# Prueba Tecnica Grow Analytics

## Setup de desarrollo

Primero, clonar el repositorio y movernos dentro del proyecto:

```bash
git clone https://github.com/eddie06d/test-challenge-grow.git
cd test-challenge-grow
```

### Setup local

Instalar las dependencias:

```bash
cd server
npm i
cd ../client # ..\client en Windows
npm i
cd ..
```

### Correr localmente

#### Backend

Movernos al directorio server:

```bash
cd server
```

Abrir **sample.env** y copiar su contenido en un nuevo archivo llamado **.env**, luego establecer un valor para **JWT_SECRET**. Ahora iniciar el servidor:

```bash
npm run dev
```

#### Inicializar Docker y Prisma

Desde la raiz del proyecto, levantar la imagen de docker:

```bash
docker-compose up -d
```

Una vez levantado es el servidor de base de datos, corremos las migraciones para crear las tablas en la base de datos:

```bash
cd server
npx prisma migrate deploy
```

#### Frontend

Movernos al directorio cliente:

```bash
cd client
```

Levantar el servidor de desarrollo:

```bash
npm run dev
```

Para poder interactuar con las vistas hay que crearse uno o varios usuarios desde swagger, ya que aun no esta implementado esa funcion desde el frontend:

1. Una vez levantado el servidor de backend, ir a la siguiente ruta en el navegador:

```bash
http://localhost:5001/swagger
```

2. Crear usuarios con la ruta POST del schema users, con la siguiente estructura:

```
{
    "usuario": "jhon06",
    "correo": "jhon_06@google.com",
    "nombre": "Jhon",
    "apell_paterno": "Doe",
    "apell_materno": "Smith",
    "contrasena": "123456",
    "tipo_usuario": "user"
}
```

Con los usuarios creados se puede hacer login e interactuar con las demas funcionalidades del sistema.

Correr los test unitarios:

```bash
npm run test
```

El backend estara corriendo en el puerto **5001** y el frontend en el puerto **5178**.
