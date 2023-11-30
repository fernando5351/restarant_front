export interface Role {
  id: number,
  name: string,
  status: string
};

export interface CreateRole extends Omit<Role,'id'>{};

export interface GetRole {
  statusCode: number,
  message: string,
  data: Role
}

export interface UpdateRole {
  name: string,
  status: string
}


export interface GetRoles extends Omit<GetRole, 'data'>{
  data: Array<Role>
}
