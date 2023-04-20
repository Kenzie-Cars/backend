import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { AppDataSource } from "../data-source";

const validateUuidMiddleware =
  (entity: any) => async (req: Request, res: Response, next: NextFunction) => {
    const testUuid = yup.string().uuid();

    const id = req.params.id;
    await testUuid.validate(id);

    const repository = AppDataSource.getRepository(entity);

    const idInfo = await repository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    if (!idInfo) {
      return res.status(404).json({ message: "id not found" });
    }

    return next();
  };

  export default validateUuidMiddleware
