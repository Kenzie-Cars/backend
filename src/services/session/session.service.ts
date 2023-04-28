import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IToken, IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<IToken> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({
    where: { email: email },
    relations: { address: true },
    withDeleted: true,
  });

  if (!user || !user.is_active) {
    throw new AppError("User or password Invalid", 401);
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("User or password invalid", 401);
  }

  const token = jwt.sign(
    {
      is_active: user.is_active,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.id,
      expiresIn: "24h",
    },
  );
  return { token, user };
};
