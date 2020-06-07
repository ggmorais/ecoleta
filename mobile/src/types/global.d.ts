declare interface Item {
  id: number;
  image: string;
  title: string;
}

declare interface Point {
  id: number;
  image?: string;
  name?: string;
  email: string;
  whatsapp?: string;
  latitude: number;
  longitude: number;
  city?: string;
  uf?: string;
  items: Item[];
}

declare interface PointRequest {
  point: Point;
  items: Item[];
}

declare interface PointDetailParams {
  point_id: number;
}

declare interface PointsParams {
  uf: string;
  city: string;
}

declare interface UF {
  id: number;
  initials: string;
  name: string;
}

declare interface IBGEUFResponse {
  sigla: string;
}

declare interface IBGECityResponse {
  nome: string;
}