import axios from "axios";

interface prod {
  _id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export const getProducts = (): Promise<prod[]> => {
  return fetch("/api/products").then((response) => response.json());
};

export const getProduct = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

export const addToCart = async (id: string, qty: number) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};
