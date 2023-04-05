export interface IAdvertisement {
  brand: string;
  model: string;
  fuel: string;
  color: string;
  description: string;
  km: number;
  FIPE_price: number;
  price: number;
  images: IImages[];
}

export interface IAdvertisementResponse {
  id: string;
  brand: string;
  model: string;
  fuel: string;
  color: string;
  description: string;
  km: number;
  FIPE_price: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  images: IImages[];
}

export interface IImages {
  id: string;
  url: string;
  title: string;
}
