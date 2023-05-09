export interface IUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description: string;
  is_adm?: boolean;
  is_seller: boolean;
  address?: IAddress | undefined;
}
export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  description?: string;
  is_seller?: boolean;
  address?: IAddress;
}

export interface IUserLogin {
  email: string;
  userPassword: string;
}
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description: string;
  is_adm: boolean;
  is_seller: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  address: IAddress;
}
export interface IUserAdvResponse {
  id: string;
  name: string;
  description: string;
  email: string
  phone: string

}

export interface IToken {
  token: string;
  restUser: Omit<IUserResponse, "password">;
}
export interface IAddress {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
}
export interface IAddressUpdate {
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}
export interface IAddressResponse {
  id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
}

export interface IPasswordForgot {
  email: string;
}

export interface IPasswordReset {
  password: string;
  passwordConfirmation: string;
}
