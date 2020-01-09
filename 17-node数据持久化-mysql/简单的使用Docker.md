# 简单的使用Docker

## 教程安装

https://yeasy.gitbooks.io/docker_practice/content/compose/rails.html

## 配置加速和镜像文件的存储

https://yeasy.gitbooks.io/docker_practice/content/compose/rails.html

> 切换到Linux

## 使用docker-compose

> 在文件目录下执行

`docker-compose.yml`

```
version: '3.1'
services:
  mongo:
    image: mongo
    restart: always
    ports:
        - 27017:27017
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      # 默认的密码
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3306:3306
  # 服务器： mysql
  # 用户名：root
  # 密码：example
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
  redis:
    image: redis
    ports:
      - "6379:6379" 
  
```

默认情况，如果服务容器已经存在，`docker-compose up` 将会尝试停止容器，然后重新创建（保持使用 `volumes-from` 挂载的卷），以保证新启动的服务匹配 `docker-compose.yml` 文件的最新内容。如果用户不希望容器被停止并重新创建，可以使用 `docker-compose up --no-recreate`。这样将只会启动处于停止状态的容器，

### `start`

格式为 `docker-compose start [SERVICE...]`。

启动已经存在的服务容器。

### `stop`

格式为 `docker-compose stop [options] [SERVICE...]`。

停止已经处于运行状态的容器，但不删除它。通过 `docker-compose start` 可以再次启动这些容器。

选项：

- `-t, --timeout TIMEOUT` 停止容器时候的超时（默认为 10 秒）。

### `top`

查看各个服务容器内运行的进程。