export interface User {
  id: number;
  idRole: number;
  email: string;
  name: string;
  role: {
    id: number;
    name: string;
    status: string;
  };
  lastname: string;
  status: string;
  createdAt: string;
  password: string;
}

export interface CreateUser extends Omit <User,'id' | 'createdAt'>{};

export interface AuthUser {
  statusCode: number;
  message: string;
  data: User;
  token: string;
}

export interface GetUser{
  statusCode: number,
  message: string,
  data: User
}

export interface getUsers extends Omit<GetUser, 'data'>{
  data:Array<User>
}

export interface getUser extends Omit<AuthUser, 'token'>{}

