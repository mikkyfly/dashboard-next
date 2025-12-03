# GIT

git add .
git commit -m "commit"
git push -uf origin main


cd existing_repo
git remote add origin http://192.168.3.50/ExMachine/dashboard.git
git branch -M main
git push -uf origin main



# Docker
## DockerCMD

docker compose up --build

docker save dashboard-main-server -o  'name.tar'

Docker load -i 'path'

Docker run 

docker run -d --network host --restart unless-stopped 'name'

-----
docker build -t dash-main-main .
docker run -p 3000:3000 dash-main-main

docker run -e REACT_APP_API_URL=ws://10.0.22.172:8080 -d --network host dashboad-frontend


## Dockerfile_Frontend

ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production


WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD npm run start
# Policy Windows

Set-ExecutionPolicy RemoteSigned


<!-- .env  -->


API_PORT=8080
API_HOST=http://localhost:

TYPEORM_CONNECTION='postgres'
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=QWE123!
TYPEORM_DATABASE=nest
TYPEORM_PORT=5432