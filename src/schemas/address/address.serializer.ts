import { IAddress, IAddressResponse } from "../../interfaces/users";
import { SchemaOf } from "yup";
import * as yup from "yup";


export const addressSerializerResponse: SchemaOf<IAddressResponse> = yup.object().shape({
    id: yup.string(),
    cep: yup.string().required("This information need to be provided. ").min(8),
    state: yup.string().required("This information need to be provided. ").min(2).max(2),
    city: yup.string().required("This information need to be provided. ").min(3),
    street: yup.string().required("This information need to be provided. "),
    number: yup.string().required("This information need to be provided. "),
    complement: yup.string().required("This information need to be provided. "),
}).clone().noUnknown() as SchemaOf<IAddressResponse>