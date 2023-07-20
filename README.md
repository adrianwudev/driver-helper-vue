# driver-helper-vue
## Start up
1. Build vue in nginx, and build another nginx for reverse proxy, ***more detail in docker-compose and Dockerfile***
   ```
   docker compose up
   ```
## Update
1. When update, need to use **docker compose down** and rmi the docker image, making sure next docker compose up could build with updates
   ```
   docker compose down
   docker images, docker rmi <IMAGE ID of frontend>
   ```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
