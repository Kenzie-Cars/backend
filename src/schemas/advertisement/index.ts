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
    FIPE_price: yup.number().required(),
    price: yup.number().required(),
    images: yup.array().required()
})

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
    images: yup.array()
})

export const ReturnAdvertisementSchema: any = yup.object().shape({
    id: yup.string().uuid().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.string().required(),
    fuel: yup.string().required(),
    color: yup.string().required(),
    description: yup.string().required(),
    km: yup.number().required(),
    FIPE_price: yup.number().required(),
    price: yup.number().required(),
    images: yup.array().of(yup
        .object()
        .shape({
            id: yup.string().uuid().optional(),
            url: yup.string().optional(),
            advertisementId: yup.string().uuid().optional()
        })).required(),
    created_at: yup.date().nullable().default(null),
    updated_at: yup.date().nullable().default(null)
});

export const ListAdvertisementsSchema: yup.SchemaOf<IAdvertisementResponse[]> = yup.array(ReturnAdvertisementSchema)