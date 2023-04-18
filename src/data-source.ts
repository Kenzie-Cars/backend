import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Address } from "./entities/address.entity";
import { Advertisements } from "./entities/advertisement.entity";
import { Images } from "./entities/images";
import { Users } from "./entities/user.entity";
import { Users_advertisements } from "./entities/users_advertisements.entity";
import { InitialMigration1681831427145 } from "./migrations/1681831427145-InitialMigration";
import { fixIsActiveDefaultValue1681832231390 } from "./migrations/1681832231390-fixIsActiveDefaultValue";
import { fixUpdateDateColumn1681836695652 } from "./migrations/1681836695652-fixUpdateDateColumn";


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
    migrations: [InitialMigration1681831427145, fixIsActiveDefaultValue1681832231390, fixUpdateDateColumn1681836695652],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
