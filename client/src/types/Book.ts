export interface Book {
  _id: string;
  title: string;
  price: number;
  image: string;
  author?: string;
  description?: string;
  category?: string;
  quantity?: number;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
