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

export interface GetCategory {
  statusCode: number,
  message: string,
  data: string
}

export interface GetCategories extends Omit<GetCategory, 'data'>{
  data: Array<Category>;
}
