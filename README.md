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

## Deployment
1. After developed, push docker image to dockerhub, let deployment easier in prod environment.
   ```
   docker tag driver-helper-vue_frontend:latest adrianwudev/driver-helper-vue:0.8131
   docker push adrianwudev/driver-helper-vue:0.8131
   ```
2. And use docker compose in folder ./dockerhub/

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
