import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Address } from "./entities/address.entity";
import { Advertisements } from "./entities/advertisement.entity";
import { Images } from "./entities/images";
import { Users } from "./entities/user.entity";
import { Users_advertisements } from "./entities/users_advertisements.entity";

import { InitialMigration1682077468804 } from "./migrations/1682077468804-InitialMigration";
import { fixAdvertisementEntity1682080402875 } from "./migrations/1682080402875-fixAdvertisementEntity";
import { AlterImageTable1682356619131 } from "./migrations/1682356619131-AlterImageTable";
import { AlterImageNullable1682357257854 } from "./migrations/1682357257854-AlterImageNullable";
import { AlterAdvTable1682384912463 } from "./migrations/1682384912463-AlterAdvTable";
import { CreatePasswordResetToken1682682965227 } from "./migrations/1682682965227-createPasswordResetToken";
import { nullableComplement1682970274049 } from "./migrations/1682970274049-nullableComplement";
import { addCommentField1683116317172 } from "./migrations/1683116317172-addCommentField";
import { fixCommentColumn1683118477211 } from "./migrations/1683118477211-fixCommentColumn";


const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );
  const dbUrl: string | undefined = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Var env DATABASE_URL was not defined"); ''
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
    migrations: [InitialMigration1682077468804, fixAdvertisementEntity1682080402875, AlterImageTable1682356619131, AlterImageNullable1682357257854, AlterAdvTable1682384912463, CreatePasswordResetToken1682682965227, nullableComplement1682970274049, addCommentField1683116317172, fixCommentColumn1683118477211]

  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
