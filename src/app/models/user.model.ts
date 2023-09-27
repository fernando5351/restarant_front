export interface User {
  id: number;
  idRole: number;
  email: string;
  name: string;
  role: {
    id: number;
    name: string;
    stats: Boolean;
  };
  lastname: string;
  status: Boolean;
  createdAt: Date;
}

export interface AuthUser {
  statusCode: number;
  message: string;
  data: User;
  token: string;
}

export interface getUser extends Omit<AuthUser, 'token'>{}

