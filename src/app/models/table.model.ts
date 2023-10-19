export interface Table {
  id: number,
  quantity: number,
  number: number,
  status: string
}

export interface CreateTable extends Omit <Table ,'id'>{};

export interface GetTable{
  statusCode: number,
  messsage: string,
  data: Table
}

export interface GetTables extends Omit<GetTable, 'data'>{
  data: Array<Table>

}
