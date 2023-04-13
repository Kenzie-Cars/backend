export interface IImages {
  url: string;
  
}

export interface IImagesResponse {
  id: string;
  url: string;
  advertisementsId: string
}

export interface IAdvertisement {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  km: number;
  color: string;
  description: string;
  FIPE_price: number;
  price: number;
}

export interface IAdvertisementResponse {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
  color: string;
  description: string;
  km: number;
  FIPE_price: number;
  price: number;
  images?: IImagesResponse[];
  created_at?: Date 
  updated_at?: Date
}