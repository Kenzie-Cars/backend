import * as yup from "yup";
import { IAdvertisementResponse } from "../../interfaces/advertisements";

export const AdvertisementSchema: any = yup.object().shape({
  brand: yup.string().required(),
  model: yup.string().required(),
  year: yup.string().required(),
  fuel: yup.string().required(),
  color: yup.string().required(),
  description: yup.string().required(),
  km: yup.number().required(),
  is_goodSale: yup.boolean().default(false),
  is_active: yup.boolean().required(),
  price: yup.number().required(),
  cover_img: yup.string().required(),
  images: yup.array().required(),
});

export const UpdateAdvertisementSchema: any = yup.object().shape({
  brand: yup.string(),
  model: yup.string(),
  year: yup.string(),
  fuel: yup.string(),
  color: yup.string(),
  description: yup.string(),
  km: yup.number(),
  FIPE_price: yup.number(),
  price: yup.number(),
  cover_img: yup.string(),
  images: yup.array(),
});

export const ReturnAdvertisementSchema: any = yup.object().shape({
  id: yup.string().uuid(),
  brand: yup.string(),
  model: yup.string(),
  year: yup.string(),
  fuel: yup.string(),
  color: yup.string(),
  description: yup.string(),
  km: yup.number(),
  FIPE_price: yup.number(),
  price: yup.number(),
  cover_img: yup.string(),
  images: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().optional(),
      image1: yup.string().optional().nullable(true),
      image2: yup.string().optional().nullable(true),
      image3: yup.string().optional().nullable(true),
      image4: yup.string().optional().nullable(true),
      image5: yup.string().optional().nullable(true),
      image6: yup.string().optional().nullable(true),
      advertisementId: yup.string().uuid().optional(),
    }),
  ),
  user: yup.array(
    yup.object().shape({
      id: yup.string().uuid().optional(),
      name: yup.string(),
      email: yup.string(),
      description: yup.string(),
    }),
  ),
  created_at: yup.date().nullable().default(null),
  updated_at: yup.date().nullable().default(null),
});

export const ListAdvertisementsSchema: yup.SchemaOf<IAdvertisementResponse[]> =
  yup.array(ReturnAdvertisementSchema);
