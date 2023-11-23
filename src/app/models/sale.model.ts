export interface SaleModel {
  id: number;
  client: string;
  total: number;
  idMesa: number;
  discount: number;
  status: boolean;
  createdAt: string;
}

export interface SaleResponse {
  statusCode: number;
  message: string;
}

export interface SaleInsert extends Omit<SaleModel, 'id'> {}

export interface SaleInsertResponse extends SaleResponse {
  data: SaleModel;
}

export interface GetSales extends SaleResponse{
  data: SaleModel[];
}

export interface GetSale extends SaleResponse{
  data: SaleModel;
}
