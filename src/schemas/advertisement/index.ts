import * as yup from "yup";

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
            imagesId: yup.string().uuid().optional()
        })).required(),
    created_at: yup.date().nullable().default(null),
    updated_at: yup.date().nullable().default(null)
});

