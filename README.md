# Form filling scrapper
This is a web scrapper built on Node.js API server project. It has Docker support as well as Jest, ESLint, and a local development server. Everything is in Typescript.

This repo contains an API which trigger an url - 'https://bukabantuan.bukalapak.com/form/175', Then fill the input with some random data and submit the form. It validate if the form is success by waiting for next/ success screen to show up.

## Prerequisite
- Node

## Nice to have
- [NVM](https://github.com/nvm-sh/nvm)
- [VS Code](https://code.visualstudio.com/)

## Getting started
- Clone the repository
```
git clone https://github.com/suyanksaraswat/form-filling-scrapper
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run local development server
```
npm run dev
```
- Using postman, curl, or your browser
```
GET http://localhost:8080
GET http://localhost:8080/api/scrap
```
- To use ESLint
```
npm run lint
```
- To run tests
```
npm test
```
## ENV variables
The project uses [dotenv](https://github.com/motdotla/dotenv) to parse environment variables. To add environment variables to your project, simply, create a `.env` file in the root folder of the project. You can then reference it using `process.env.VAR_NAME`. For example, to change Node.js mode, simply add `NODE_ENV=production` or `NODE_ENV=development` to your `.env` file to change Node.js mode to production or development accordingly.

Remeber: it's not a good idea to push .env files to your repo!
## Logging
This project uses [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan) for logging. Winston is exported as a logger and can be used to log custom messages on demand. Also, it can be extended to push logs to files, external database, or any logging service.

Morgan is used as an http logger middleware for Express and the logs are routed through Winston, so everything is nicely bundled in one log stream.

All of these logs are written to console during development. Feel free to add production-specific loggers as and when needed.
## Project structure
```
form-filling-scrapper
├─ .editorconfig
├─ .eslintrc.json
├─ .github
│  └─ workflows
│     └─ build-test.yml
├─ .gitignore
├─ .nvmrc
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
├─ Dockerfile
├─ LICENSE
├─ README.md
├─ error.log
├─ jest.config.ts
├─ package-lock.json
├─ package.json
├─ src
│  ├─ common
│  │  ├─ http-exception.ts
│  │  └─ logger.ts
│  ├─ controllers
│  │  └─ scrap.controller.ts
│  ├─ index.ts
│  ├─ middleware
│  │  ├─ error.middleware.ts
│  │  ├─ http-logger.middleware.ts
│  │  ├─ index.ts
│  │  └─ not-found.middleware.ts
│  ├─ routers
│  │  └─ scrap.router.ts
│  └─ services
│     └─ scrap.service.ts
├─ tests
├─ tsconfig.json
└─ types

```
## General notes
- This is meant to be a basic scrap project. Feel free to renhance this code.
- ESLint is run as part of the build command 