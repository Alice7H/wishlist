export interface Wish {
  id: string;
  title: string;
  value: number;
  status: 'completed'| 'removed'| 'none',
}
