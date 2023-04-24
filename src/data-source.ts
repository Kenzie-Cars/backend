import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Address } from "./entities/address.entity";
import { Advertisements } from "./entities/advertisement.entity";
import { Images } from "./entities/images";
import { Users } from "./entities/user.entity";
import { Users_advertisements } from "./entities/users_advertisements.entity";

import { InitialMigration1681923069819 } from "./migrations/1681923069819-InitialMigration";
import { AlterImageTable1682356619131 } from "./migrations/1682356619131-AlterImageTable";
import { AlterImageNullable1682357257854 } from "./migrations/1682357257854-AlterImageNullable";



const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );
  const dbUrl: string | undefined = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Var env DATABASE_URL was not defined");''
  }

  const nodeEnv: string | undefined = process.env.NODE_ENV;
  if (nodeEnv == "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [Users, Address, Advertisements, Images, Users_advertisements],
    };
  }
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [Users, Address, Advertisements, Images, Users_advertisements],
    migrations: [InitialMigration1681923069819, AlterImageTable1682356619131, AlterImageNullable1682357257854],

  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
