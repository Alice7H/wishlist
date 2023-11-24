export interface Wish {
  id: string;
  title: string;
  value: number;
  status: Status;
}

export type Status = 'completed' | 'none';