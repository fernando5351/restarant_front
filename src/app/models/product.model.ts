export interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
  description: string;
  file: unknown;
  quantity: number;
  categoryId: number;
}

export interface CreateProduct extends Omit<Product, 'id'>{}

export interface GetProduct {
  statusCode: number;
  message: string;
  data: Product;
}

export interface GetProducts extends Omit<GetProduct,  'data'> {
  data: Array<Product>;
}