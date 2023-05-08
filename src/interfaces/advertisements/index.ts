import { IUserAdvResponse } from "../users";

export interface IImages {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;

}

export interface IImagesResponse {
  id: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  advertisementsId: string
}

export interface IAdvertisement {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  km: number;
  is_goodSale: boolean
  is_active: boolean
  color: string;
  description: string;
  price: number;
}

export interface IUpdateAdvertisement {
  brand?: string;
  model?: string;
  year?: string;
  fuel?: string;
  km?: number;
  color?: string;
  description?: string;
  FIPE_price?: number;
  price?: number;
  images?: IImagesResponse[];
}

export interface IAdvertisementResponse {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
  color: string;
  user: IUserAdvResponse
  description: string;
  km: number;
  FIPE_price: number;
  price: number;
  images?: IImagesResponse[];
  created_at?: Date
  updated_at?: Date
}