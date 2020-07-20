# Database Migration Steps

## Source

TypeORM makes database migration easier by comparing project entities and current database state. Document with all the different aspects and advanced tips can be found [here](https://typeorm.io/#/migrations).
We have added some npm scripts in the `package.json` file, which are used to generate, run and revert database migrations.

```json
{
  "scripts": {
    "typeorm:dev": "cross-env NODE_ENV=development ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/database/options/typeorm-migration.options.ts",
    "typeorm:prod": "cross-env NODE_ENV=production ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/database/options/typeorm-migration.options.ts",
    "migration:generate": "npm run typeorm:dev migration:generate -- -n",
    "migration:run:dev": "npm run typeorm:dev migration:run",
    "migration:revert:dev": "npm run typeorm:dev migration:revert",
    "migration:run:prod": "npm run typeorm:prod migration:run",
    "migration:revert:prod": "npm run typeorm:prod migration:revert"
  }
}
```

## Steps for migrating database with TypeORM

1. Generate migration script using `npm run migration:generate <migration-file-name>`. Migration file will be generated in `{project_root}/migrations` with the given name `<timestamp>-<migration-file-name>.ts`, for e.g. "1590908301124-TestMigration.ts".
2. Run migration script using `npm run migration:run:prod` ( `npm run migration:run:dev` for development environment ). All the files which are not yet ran, will be implemented in DB.
3. Revert latest migration using `npm run migration:revert:prod` ( `npm run migration:revert:dev` for development environment ). This script can be run multiple times to revert one change at a time, latest migration will be reverted in a single run. TypeORM will create an additional table to manage migrations and will keep track of all the changes made in database.
