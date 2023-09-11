# ⭐ CRM

Para poder ejecutar la aplicación en tu propio entorno de desarrollo, debes de seguir los siguientes pasos:

## ⚙️ Configurar contenedor y volúmenes de Docker

Para correr localmente el servidor, se necesita la base de datos corriendo, para ello debes de ejecutar el docker compose:

```sh
docker-compose up -d
```

## 🛠️ Establecer las variables de entorno

Renombrar el archivo _.env.template_ a _.env_

- **Mongo DB**:

```env
MONGO_URL=mongodb://localhost:27017/crmdb
```

## 🛠️ Reconstruir los módulos de Node y Levantar la Aplicación

Para reconstruir los módulos de Node unicamente instalamos las dependencias, para esto ejecutamos el siguiente comando:

```sh
pnpm install
```

Una vez reconstruidos los módulos de Node, levantamos el entorno de ejecución en modo desarrollo de la aplicación con:

```sh
pnpm dev
```

## 🐳 Correr la aplicación en contenedor de Docker

Para poder correr la aplicación en un contenedor de _Docker_, necesitamos generar la _imagen_ de _Docker_ con el siguiente comando:

```sh
docker build -t crm-next .
```

Después necesitamos correr la imagen generada en un contenedor, para esto usamos el siguiente comando:

```sh
docker run --name=crm-next-app -p 3000:3000 crm-next
```

Si se desea correr la aplicación de este contenedor en el puerto `80`, necesitamos especificarlo en el puerto:

```sh
docker run --name=crm-next-app -p 80:3000 crm-next
```
