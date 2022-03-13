# Challenge Uphold

## Setup

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

## Assessment Challenge

Use the Uphold API to create a bot that is able to alert you about price oscillations on a given
currency pair.
All code should be delivered on a private repository — you may use GitHub, Bitbucket or
GitLab for this purpose. Once you’re finished, please provide access to the emails in the
Contacts section below and include a link to the project's repository.
Our API documentation is available here.

NOTE: If you have the time and want to deliver a better bot you can tackle both optional and
bonus items (you don’t have to complete the optional phase to pick a bonus item).

## Requirements

You can use any npm package you see fit to solve this problem.

● Language: ECMAScript 2020

● Node.js: > v14

## Phase 1 (mandatory)

● You must create a README.md file in your project root explaining how we can run the
bot. Make sure to include all the necessary set up and execution instructions, and
avoid implicit prerequisites.

● You must connect to Uphold public ticker and retrieve the BTC-USD rate every 5
seconds. Each time you retrieve a new rate, the bot must compare it with the first one
and decide if it should alert of an oscillation. For the purpose of this exercise we want
to be alerted (a simple log if sufficient) if the price changes 0.01 percent in either
direction (price goes up or down).

## Phase 2 (optional)

● Handle multiple currency pairs at the same time.

● Accept all the parameters (currency pairs, fetch interval, price oscillation percentage,
etc.) as arguments.
● Create a test suite for your code (e.g. jest or mocha).

## Phase 3 (bonus)

● Dockerize your application.

● Create a database to store all the alerts generated (e.g. Postgres). - Persist all the information that you consider relevant (e.g. timestamps, rate, bot configuration at the time of the alert, etc.)
