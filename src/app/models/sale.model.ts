export interface SaleModel {
  id: number;
  client: string;
  total: number;
  subTotal: number;
  idMesa?: number;
  discount: number;
  productIds: Array<number>;
  cellphone: number;
  comboIds: Array<number>;
  quantity: Array<number>;
  comboQuantity: Array<number>;
  status: boolean;
  createdAt: string;
}

export interface SaleResponse {
  statusCode: number;
  message: string;
}

export interface GetSearch extends SaleResponse {
  data: any;
}

export interface SaleInsert extends Omit<SaleModel, 'id' | 'createdAt'> {}

export interface SaleInsertResponse extends SaleResponse {
  data: SaleModel;
}

export interface GetSales extends SaleResponse{
  data: SaleModel[];
}

export interface GetSale extends SaleResponse{
  data: SaleModel;
}
