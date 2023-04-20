import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const validateAdvertiseField =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.is_seller) {
      req.body.userAdvertisements = [];
    }
    next();
  };

export default validateAdvertiseField;
