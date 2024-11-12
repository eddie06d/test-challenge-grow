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

Correr los test unitarios:

```bash
npm run test
```

El backend estara corriendo en el puerto **5001** y el frontend en el puerto **5178**.
