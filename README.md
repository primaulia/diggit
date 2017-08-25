# diggit
Is this the real Digg? Is this just Reddit?

## Setup

1. Install Postgres on your machine

If you have [homebrew](https://brew.sh/) installed, 

```
$ brew install postgresql
```

You can also install the [Postgres app](http://postgresapp.com/).

2. Run Postgres

If you have installed the app, just launch the app. 

If you have installed through homebrew, start Postgres with

```
$ brew services start postgresql
```

3. Create database named `diggit` under the postgres user.

```
$ createdb diggit -O postgres
```

4. Install yarn (optional)

```
$ brew install yarn
```

4. Install Sequelize Cli

```
$ npm install -g sequelize-cli
```

or 

```
$ yarn global add sequelize-cli
```

5. Install dependencies

```
$ npm install
```

or

```
yarn
```

5. Migrate the database

```
$ sequelize db:migrate
```

6. Seed the database

```
$ sequelize db:seed:all
```

## Development

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run dev` or `yarn dev`

Runs the Express app in development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run react` or `yarn react`

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Helpful notes
