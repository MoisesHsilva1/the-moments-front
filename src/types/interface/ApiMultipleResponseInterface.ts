export interface ApiMultipleResponseInterface<T> {
  limit: number;
  offset: number;
  total: number;
  rows: T[];
}
