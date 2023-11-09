export interface Combo {
  id: number;
  name: string;
  price: number;
  status: string;
}

export interface CreateCombo extends Omit<Combo, 'id'>{}

export interface GetCombo {
  statusCode: number;
  message: string;
  data: Combo
}

export interface GetCombos extends Omit<GetCombo , 'data'>{
  data: Array<Combo>
}
