export interface Combo {
  id: number;
  name: string;
  price: number;
  status: string;
  productIds: [
    {
      id: number,
      name: string,
      description: string,
      price: string,
      quantity: string,
      imgUrl: string,
      status: boolean
    }

  ]
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
