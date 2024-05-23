# Usamos la imagen oficial de MySQL como base
FROM mysql:latest

# Configuramos las variables de entorno para MySQL
ENV MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
ENV MYSQL_DATABASE=${DB_DATABASE}
#COPY ./database/create_database.sql /docker-entrypoint-initdb.d/

# Exponemos el puerto que usará MySQL
EXPOSE 3306

# Comando por defecto para correr MySQL
CMD ["mysqld"]
