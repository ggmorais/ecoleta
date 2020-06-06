declare interface Item {
  id: number;
  title: string;
  image: string;
}

declare interface State {
  id: number;
  initials: string;
  name?: string;
}

declare interface IBGEStateResponse {
  sigla: string;
}

declare interface IBGECityResponse {
  nome: string;
}

declare interface MapCordinates {
  latitude: number;
  longitude: number;
}

declare interface PointFormData {
  name: string;
  whatsapp: string;
  email: string;
  item: string;
}