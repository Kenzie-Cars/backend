import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Users } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Advertisements } from "./entities/advertisement.entity";
import { Images } from "./entities/images";
import { Users_advertisements } from "./entities/users_advertisements.entity";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
    const migrationsPath: string = path.join(
        __dirname,
        "./migrations/**.{js,ts}"
      );
  const dbUrl: string | undefined = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Var env DATABASE_URL was not defined");
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
    migrations: [migrationsPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
