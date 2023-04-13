import * as yup from "yup";
import { IImages } from "../../interfaces/advertisements";

export const ImagesSchema: yup.Schema<IImages> = yup.object().shape({
    url: yup.string().required()
})

export const ReturnImagesSchema: yup.Schema<IImages> = yup.object().shape({
    id: yup.string().required(),
    url: yup.string().required(),
    imagesId: yup.string().required()
})