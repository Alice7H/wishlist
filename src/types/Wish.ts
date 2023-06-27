export interface Wish {
  id: string;
  title: string;
  value: number;
  status: Status;
}

type Status = 'completed'| 'removed'| 'none';