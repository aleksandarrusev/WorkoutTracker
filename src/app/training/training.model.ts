export interface Training {
  id: string;
  name: string;
  duration: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
  user?: string;
  exercises: Array<string>;
}
