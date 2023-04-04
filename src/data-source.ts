import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
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
      entities: [],
    };
  }
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [],
    migrations: [],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
