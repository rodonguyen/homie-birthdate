# Homie Birthdate API
Just a special way to say happy birthday along with the good words to my homies. 

## Technologies used
- [Nest](https://github.com/nestjs/nest)
- Prisma
- Postgre


## Installation
```bash
yarn install
yarn postinstall      
```

## Running the app
```bash
# development:
yarn run db:dev:up            # start the dev database with existing data
yarn run start:dev            # run nestjs app in Watch mode

# other:
yarn run start                # run nestjs app without Watch mode
yarn run start:prod           # production mode
```


## Database Commands
```bash
# for DEV
yarn run db:dev:rm            # remove dev postgres database Docker Image
yarn run prisma:dev:deploy    # run pending migrations
yarn run db:dev:up            # start the dev database with existing data
yarn run db:dev:reset         # reset the dev database (remove all data)

npx prisma migrate dev        # create a database migration after chaging table structure
npx prisma studio             # start prisma studio at http://localhost:5555

# for TESTING
yarn run db:test:rm
yarn run prisma:test:deploy
yarn run db:test:up
yarn run db:test:reset
```

## Other commands
```bash
yarn build                    # build for Production
yarn formatLint               # format and lint check (ideally before committing)
```

## Test
```bash
yarn run pretest:e2e      # preprocessing before e2e tests
yarn run test:e2e         # e2e tests
yarn run test:cov         # test coverage
```

## License
Nest is [MIT licensed](LICENSE).
