import { IAddressResponse } from "../../interfaces/users";
import { SchemaOf } from "yup";
import * as yup from "yup";

export const addressSerializerResponse: SchemaOf<IAddressResponse> = yup
  .object()
  .shape({
    id: yup.string(),
    cep: yup.string(),
    state: yup.string(),
    city: yup.string(),
    street: yup.string(),
    number: yup.string(),
    complement: yup.string(),
  })
  .clone()
  .noUnknown() as SchemaOf<IAddressResponse>;
