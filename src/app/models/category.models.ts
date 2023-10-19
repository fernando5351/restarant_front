import { Products } from "./product.model";

export interface CreateCategory {
  id: number;
  name: string;
  file: unknown;
  status: string;
}

export interface Category extends Omit <CreateCategory, 'file'>{
  imgUrl: string
}

export interface CreateCategories extends Omit<CreateCategory,'id'>{}

export interface CategoryDetails extends Category{
  Product: Products[];
}
export interface GetCategory {
  statusCode: number,
  message: string,
  data: CategoryDetails
}

export interface CategoryDetail{
  id: number;
}

export interface GetCategories extends Omit<GetCategory, 'data'>{
  data: Array<Category>;
}
