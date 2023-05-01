import { IPasswordForgot, IPasswordReset, IUser, IUserResponse } from "../../interfaces/users";
import { SchemaOf } from "yup";
import * as yup from "yup";
import { addressSerializerResponse } from "../address/address.serializer";
import { ListAdvertisementsSchema } from "../advertisement";

export const userSerializer: SchemaOf<IUser> = yup.object().shape({
    name: yup.string().required("You need to register a name."),
    email: yup.string().email().required("You need to register an e-mail."),
    password: yup.string().required("You need a password.").min(4),
    cpf: yup.string().min(11).required("You need to fill the CPF field."),
    phone: yup.string().required("Phone field is required.").min(9),
    birthDate: yup.string().min(8),
    description: yup.string().required("Write a description"),
    is_adm: yup.boolean().notRequired().default(false),
    is_seller: yup.boolean(),
    address: addressSerializerResponse,
    userAdvertisements: ListAdvertisementsSchema.notRequired()
}).clone() as SchemaOf<IUser>

export const responseUserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
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
    userAdvertisements: ListAdvertisementsSchema
}).clone() as SchemaOf<IUserResponse>

export const forgotPasswordSerializer: SchemaOf<IPasswordForgot> = yup.object().shape({
    email: yup.string().email('Email is invalid').required('please enter your email')
})

export const resetPasswordSerializer: SchemaOf<IPasswordReset> = yup.object().shape({
    password: yup.string().required('please enter your new password'),
    passwordConfirmation: yup.string().required('enter password confirmation').oneOf([yup.ref('password'), null], "passwords do not match!")
})
