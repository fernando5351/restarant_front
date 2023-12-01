
  // export interface Sale {
  //   id: number;
  //   client: string;
  //   total: number;
  //   subTotal: number;
  //   idMesa?: number;
  //   discount: number;
  //   productIds: Array<number>;
  //   cellphone: number;
  //   comboIds: Array<number>;
  //   quantity: Array<number>;
  //   comboQuantity: Array<number>;
  //   status: boolean;
  //   createdAt: string;
  // }

  // export interface GetSale{
  //   statusCode: 0,
  //   message: '',
  //   data: Sale
  // }

  // export interface getSales extends Omit<GetSale, 'data'> {
  //   data: Array<Sale>
  // }
  export interface Sale {
    id: number;
    client: string;
    total: number;
    subTotal: number;
    idMesa?: number;
    discount: number;
    productIds: number[];
    cellphone: number;
    comboIds: number[];
    quantity: number[];
    comboQuantity: number[];
    status: boolean;
    createdAt: string;
  }

  export interface GetSale {
    statusCode: number;
    message: string;
    data: Sale;
  }

  export interface GetSales extends Omit<GetSale, 'data'> {
    data: Sale[];
  }
