export interface Catagory {
  id: number;
  name: string;
  file: unknown;
  status: string;
}

export interface CreateCategory extends Omit<Catagory,'id'>{}

export interface GetCategory {
  statusCode: number,
  message: string,
  data: string
}

export interface GetCategorys extends Omit<GetCategory, 'data'>{
  data: Array<Catagory>;
}
