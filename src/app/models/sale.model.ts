import { Combo, OneCombo } from "./combo.model";
import { Products } from "./product.model";
import { Sale } from "./report.model";

export interface SaleModel {
  id: number;
  client: string;
  waiter: string;
  code: number;
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
  SaleCombo?: Combo[];
  SaleProducts?: Products[];
}

export interface SaleAModel {
  id: number;
  client: string;
  waiter: string;
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
  SaleCombo?: Combo;
  SaleProducts?: Products[];
}

export interface SaleResponse {
  statusCode: number;
  message: string;
}

export interface GetSearch extends SaleResponse {
  data: any;
}

export interface SaleInsert extends Omit<SaleModel, 'id' | 'createdAt'| 'productIds'| 'comboIds'> {
  productArray: Array<number>;
  comboArray: Array<number>;
}

export interface SaleInsertResponse extends SaleResponse {
  data: SaleModel;
}

export interface GetASale extends SaleResponse {
  data: SaleModel;
}

export interface SaleGet {
  statusCode: number,
  message: string,
  data: SaleModel
}

export interface GetSales extends SaleResponse{
  data: SaleModel[];
}

export interface GetSale extends SaleResponse{
  data: SaleModel;
}
