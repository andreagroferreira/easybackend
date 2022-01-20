
<h1>
<p align="center">
  <a href="http://eviso.it/" target="blank"><img src="https://www.eviso.it/sites/all/themes/eviso/logo.png" width="320" alt="Evisos Logo" /></a>
</p></h1>

## Table of Contents

<details>
<summary>Expand / collapse contents</summary>

- [Table of Contents](#table-of-contents)
- [Description](#description)
  - [Features](#features)
- [Installation](#installation)
  - [Unix Based Systems](#unix-based-systems)
  - [Windows](#windows)
- [Setting Up the Project - Only Once per Project](#pomanager-setting-up-the-project---only-once-per-project)
- [Development Environment](#development-environment)
- [Docker](#docker)
- [Test](#test)
- [Swagger](#swagger)
- [Sources](#sources)
</details>

## Description

<p align="center">Backend boilerplate for Eviso applications <a href="http://eviso.it" target="_blank"></a> this is build by using NESTJS framework for building efficient and scalable server-side applications.</p>

### Features

- Scalable and configurable architecture with NestJS.
- Awesome DX with Typescript/TSLint, Hot Module Reload (HMR), and git hooks for formating/linting/testing.
- Auto-documentation with Swagger (and Typescript in code).
- Sensible environment variables stored in .env.XXX files, which can be derivated depending on mode `developement` or `production`.
- Multi-platform deployment compatibility thanks to Docker.

## Installation

Install dependencies

```bash
bash
npm
yarn
```

#### Unix Based Systems
In Unix based systems, ```bash``` comes pre-installed.

For linux, use the following commands to install ```npm``` and ```yarn```:
```bash
> sudo apt update
> sudo apt install nodejs npm
> npm install --global yarn
```

For MacOS, you will need to first install [**Homebrew**](https://brew.sh/).
Then, run the following commands:
```bash
> brew install node
> npm install --global yarn
```
#### Windows
In Windows, it is recommended to use **WSL**. Please follow this tutorial: [***WSL on Windows 10***](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps).
After installing it, you can follow the steps described for Unix Systems.

## PO/MANAGER: Setting Up the Project - Only Once per Project
To set up this boilerplate, you must run:
```bash
> bash initial_setup.sh
```
This script is responsible to replace the placeholder for the Heroku instance on ```.gitlab-ci.yml```.
When asked, provide the name of the project you gave on Heroku.

After replacing the placeholder, **the script commits and pushes the change to the current working Git branch**,
so be sure you are in the correct branch to make the commit!

## Development Environment
After the PO/Manager sets up the boilerplate for the project, you need to follow these steps to run the 
backend in your machine.

### 1. Install Packages
The first thing you should do in any node based project is to install the required packages:
```bash
> yarn install
```

Every time someone installs a package (e.g., while working on a different feature), if you pull their branch, 
you need to run this command. Otherwise, you will get an error because of missing packages.
### 2. Create environment file
The backend needs a ```.env.development``` to run. To generate the file, run:
```bash
> bash local_env_setup.sh
```
This script creates the ```.env.development``` needed to run the backend. Some variables have default values 
while others, are dependent on accesses, user, password, etc, so you must ask your PO/Manager to provide you 
the correct credentials.

***NOTE:*** It is very important to keep ```local_env_setup.sh``` updated, meaning that every time the backend needs a new variable, 
you should add it to this script. This way if a new dev enters the project, they already have the skeleton of 
the ```.env.developement``` ready to be used.

### 3. Edit ```.env.development```
As stated is the previous point, you need to complete the environment file before running the backend.
   
### 4. Start the Backend
To start the backend run:
```bash
> yarn start:dev
```
You may notice that some warnings may arise or even errors may occur that prevents the backend from starting. 
This happens because the commands runs a lint for TypeScript. Be sure to fix all warnings and errors from the linter!

The same linter runs before making a commit to Git. 
### Docker
Depending on the project, you can also use the backend with dockers.

To mount the project with Docker, you can use `yarn deploy:local` (which executes `docker-compose up`)

Alternatively, you can follow [***this method***](https://medium.com/@kahana.hagai/docker-compose-with-node-js-and-mongodb-dbdadab5ce0a).  

The basic steps are :
- Mount an empty container.
- Connect inside it into its shell terminal with `docker exec -it <CONTAINER_ID> /bin/bash`.
- Mount and seed the db with above steps in Mongo or Postgres paragraphs.

## Test
If you project supports tests with Jest, here is a list of useful commands you can use.
```bash
# Unit tests
yarn test

# e2e tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Swagger
Swagger is listening on `localhost:3000/api/docs` by default. You can change this by changing the corresponding
environment variable.

The version of the Swagger API is bounded to the Git Tag of the most recent commit on the target branch.

It is really important to create the habit to use tags on the commit that merges the changes with the master branch:
1. Once you do the last commit to be included in the release, add a tag to it. You can use the GitLab website or
use the following commands:
   1. `> git commit -m "<commit message>"`
   2. `> git tag v<version_number>`
   3. `> git push origin <branch> --tags`
  
You can refer to this [**link**](https://semver.org/) to find how to name your releases.

## i18N
We included in the boilerplate the option to have translations.

Inside `example.controller`, you can find an endpoint where the translation happens.

If you call `localhost:3000/api/example?lang=en`, you will get the translation for the default message in English.
If you call `localhost:3000/api/example?lang=it`, you will get the Italian version of the same message.

For deeper information about this topic, please refer to the [**official documentation**](https://www.npmjs.com/package/nestjs-i18n#versions) of the `nestjs-i18n` package.

## Sources

- [Install Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

- [Install NodeJS on Linux](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/)

- [Install NodeJS on MacOS](https://treehouse.github.io/installation-guides/mac/node-mac.html)

- [Another Source for Installing Bash on Windows](https://hackernoon.com/how-to-install-bash-on-windows-10-lqb73yj3)
