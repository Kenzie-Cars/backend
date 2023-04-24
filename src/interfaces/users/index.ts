export interface IUser {
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description: string;
  is_adm?: boolean;
  is_seller: boolean;
  address: IAddress;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserResponse {
  id: string;
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
43
export interface IToken {
  token: string;
  user: IUserResponse;
}
export interface IAddress {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
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
