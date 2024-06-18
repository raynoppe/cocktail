# Cocktail. Out the box SaaS / Web App boilerplate. Let’s you setup the fundamentals in minutes instead of weeks.

## What will be included in the box?
- Complete SaaS/web app foundation
- User registration and login using credentials (completed)
- User authentication with role management (completed)
- User management
- File management 
- Content management system. Create pages and folders without coding (in progress)
- Data management module
- Navigation management 
- Unit and end to end test (in progress)

## Tech stack 
- Next.js latest
- Next-Auth (Auth.js)
- Typescript
- Tailwind CSS
- Shadcn/ui


## Getting Started

Install all the dependancies

```bash
npm install
```

### Setting up the database on local host

Note: this will create 2 databases. The default postgress database is used for all the core stuff and the cocktail database will be for dynamic databases. 

Open the docker-compose.yml file in the docker folder and set your ports in the db section and change the password. If you already have a postgres client and you don't need adminer you can delete the block. When done save and run docker compose up

```bash
cd docker
docker compose up

```

### Create an .env file
in the root of the folder create a .env file with the following: 

```bash
NODE_ENV=development
NEXT_TOKEN_SALT="choose a salt to use"
NEXTAUTH_SECRET="create a secret, I recommend using a long secret generated using uuid"
# make sure your database port and password is the same as you set in the docker compose file
DATABASE_URL=postgresql://postgres:yourpasshere@localhost:5432
# if you change the port number in the dev rule in the package file make sure the below is the same. In production this will be your final url.
NEXTAUTH_URL=http://localhost:3008
```

## Start it in dev mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3008](http://localhost:3008) with your browser to see the result.



