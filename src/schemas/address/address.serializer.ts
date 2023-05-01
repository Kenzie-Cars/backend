import { IAddress, IAddressResponse, IAddressUpdate } from "../../interfaces/users";
import { SchemaOf } from "yup";
import * as yup from "yup";


export const addressSerializerResponse: SchemaOf<IAddressResponse> = yup.object().shape({
    id: yup.string(),
    cep: yup.string(),
    state: yup.string(),
    city: yup.string(),
    street: yup.string(),
    number: yup.string(),
    complement: yup.string(),
}).clone().noUnknown() as SchemaOf<IAddressResponse>

// export const addressSerializerUpdate: SchemaOf<IAddressUpdate> = yup.object().shape({
//     cep: yup.string().notRequired(),
//     state: yup.string().notRequired(),
//     city: yup.string().notRequired(),
//     street: yup.string().notRequired(),
//     number: yup.string().notRequired(),
//     complement: yup.string().notRequired()
// })