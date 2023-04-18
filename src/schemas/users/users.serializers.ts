import { IUserResponse } from "../../interfaces/users";
import { SchemaOf } from "yup";
import * as yup from "yup";
import { addressSerializerResponse } from "../address/address.serializer";

export const responseUserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string(),
    email: yup.string(),
    cpf: yup.string(),
    phone: yup.string(),
    birthDate: yup.string(),
    description: yup.string(),
    is_adm: yup.boolean(),
    is_seller: yup.boolean(),
    is_active: yup.boolean(),
    created_at: yup.date(),
    updated_at: yup.date(),
    address: addressSerializerResponse,
}).clone().noUnknown() as SchemaOf<IUserResponse>