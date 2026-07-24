import type { Vehicle } from './Vehicle';

export interface VehiclesResponse {
  products: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}
