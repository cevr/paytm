export interface ExchangesData {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface Receipt {
  id: string;
  amount: string;
  amountCAD: number;
  currency: string;
  description?: string;
}
