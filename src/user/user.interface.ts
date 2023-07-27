export interface UserInterface {
  id: number;
  user_id: bigint;
  avatar: string;
  name: string;
  street: string;
  lat: string;
  lng: string;
  country_id: number;
  city_id: number;
  district_id: number;
  ward_id: number;
  phone: string;
  gender: string;
  birthday: string;
  timestamp: Date;
}
