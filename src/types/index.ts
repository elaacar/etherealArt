export interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  story: string;
  price: number;
  category?: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
  username?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
