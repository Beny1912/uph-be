# Challenge

## Setup

### Config env vars

You can leave the default configuration to env vars. You can find this vars in folder /env at the root of project.
You can find 2 file, [.env.dev](/env/.env.dev) and .env.pro to differents environments DEV and PRO
View Example:

```bash

# ---------------- BASIC ENVIRONMENT CONFIGURATION ---------------------------
NODE_ENV=DEV
# ----------------------------------------------------------------------------
# If you run in mode bot(BOT=YES)
BOT=YES
PORT=3000
# If you run mongo service from docker local uncomment
MONGO_URI=
TOKEN_SECRET=uphold

```


### Run test

```bash

git clone https://github.com/Beny1912/uph-be.git

cd uph-be

npm i

npm run test

```

### Run project dev

Global requirements:

[Node 17.3.0](https://nodejs.org/en/)

[Docker Desktop](https://www.docker.com/products/docker-desktop)

[MongoDB](https://www.mongodb.com/es) (Only if you want run a local database without docker)

Global npm packages

[Eslint](https://www.npmjs.com/package/eslint)

[Typescript](https://www.npmjs.com/package/typescript)

[Jest](https://www.npmjs.com/package/jest)

[Prettier](https://www.npmjs.com/package/prettier)

[Nodemon](https://www.npmjs.com/package/nodemon)

[Husky](https://www.npmjs.com/package/husky)

You can install all global packager requirements with this command, assuming that Node is already installed

(Make sure env var BOT=YES)

```bash

#Windows

npm i -g eslint tsc jest prettier nodemon husky

#Mac & Linux

sudo npm i -g eslint tsc jest prettier nodemon husky

```

You can run this project in dev mode like this:

```bash

git clone https://github.com/Beny1912/uph-be.git

cd uph-be

npm i

npm run start-dev

```

### Running with Docker

You can run this project in a docker container, to make easy, we have created a Makefile, assuming that Docker is installed and running in your device run the following

(Make sure env var BOT=YES)

```bash

git clone https://github.com/Beny1912/uph-be.git

cd uph-be

#Command to build project into a docker image
make build

#Command to run in a container the docker image created on the last step
make run

#Command to watch the log file inside docker image
make show-txt

#When you need stop de image
make stop

#When you need restart the container again
make start

#If you need delete the container
make rm

#If you need delete the image
make rmi

```

### Running project with Docker Compose

(Make sure env var BOT=YES)

```bash

git clone https://github.com/Beny1912/uph-be.git

cd uph-be

#To Start
docker-compose up

#To stop
docker-compose down

```

### Run API mode

If you want to connect with a app run this app like a API REST, config env var BOT=NO

(Make sure env var BOT=NO)

### Postman link

[Postman link](https://www.getpostman.com/collections/ccc123e235b5ea5b1103)

You need to configure the next Environment Vars: HOST, PORT, TOKEN (should be obtained with signin endpoint)

### Postman file

[Postman file](Uphold.postman_collection.json)

You need to configure the next Environment Vars: HOST, PORT, TOKEN (should be obtained with signin endpoint)
