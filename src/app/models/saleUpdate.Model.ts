// sale-response.interface.ts

export interface SaleResponse {
  statusCode: number;
  message: string;
  data: SaleData;
}

export interface SaleData {
  id: number;
  client: string;
  total: number;
  idMesa: number | null;
  discount: number;
  code?: number;
  subTotal: number;
  cellphone: string | null;
  waiter: string;
  status: boolean;
  createdAt: string;
  SaleProducts: SaleProduct[];
  SaleCombo: SaleCombo[];
}

export interface SaleProduct {
  id: number;
  name: string;
  description: string;
  imgUrl: string | null;
  price: number;
  categoryId: number;
  quantity: number;
  status: string;
  SaleProduct: {
    saleId: number;
    productId: number;
    comboId: number | null;
    quantity: number;
  };
}

export interface SaleCombo {
  id: number;
  name: string;
  price: number;
  status: string;
  imgUrl: string;
  SaleProduct: {
    saleId: number;
    productId: number;
    comboId: number;
    quantity: number;
  };
}
