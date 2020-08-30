export interface DataSetResponse {
  id: number;
  name: string;
  created: string;
  distribution: {
    [k: string]: number;
  };
}
