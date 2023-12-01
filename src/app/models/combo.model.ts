export interface Combo {
  id: number;
  name: string;
  price: number;
  status: string;
  imgUrl?: File | null;
  Product: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imgUrl: File | null;
    status: string;
    categoryId: number;SaleProduct?: {
      saleId: number;
      productId: number;
      comboId: number;
      quantity: number
    },
  }>;
}

export interface CreateCombo {
  name: string;
  price: number;
  status: string;
  Product: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: boolean;
    categoryId: number;
  }>;
}


export interface UpdateCombo {
  name?: string;
  price?: number;
  status?: string;
  products?: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: boolean;
    categoryId: number;
  }>;
}

export interface GetCombo {
  statusCode: number;
  message: string;
  data: Combo
}

export interface GetCombos extends Omit<GetCombo , 'data'>{
  data: Array<Combo>
}
