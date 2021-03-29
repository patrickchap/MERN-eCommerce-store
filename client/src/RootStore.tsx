import { observable, action, makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
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
  subcategory: string;
  reviews: Array<any>;
}

interface shippingDetail {
  Address: string;
  City: string;
  PostalCode: number;
  Country: string;
}

interface cartItem {
  _id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
  qty: number;
  subcategory: string;
}

interface userInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export class RootStore {
  ProductStore: ProductStore;
  CartStore: CartStore;
  UserStore: UserStore;
  constructor() {
    this.ProductStore = new ProductStore(this);
    this.CartStore = new CartStore(this);
    this.UserStore = new UserStore(this);
  }
}

let userInfoFromStorageString = localStorage.getItem("userInfo");
let userInfoFromStorage: userInfo | undefined;
if (userInfoFromStorageString) {
  userInfoFromStorage = JSON.parse(userInfoFromStorageString);
} else {
  userInfoFromStorage = undefined;
}

export class CartStore {
  rootStore: any;
  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  itemsFromStorage = () => {
    let cartFromStorage: cartItem[] = [];
    let cartStringFromStorage = localStorage.getItem("cartItems");
    if (cartStringFromStorage) {
      cartFromStorage = JSON.parse(cartStringFromStorage);
      return cartFromStorage;
    }
  };

  addressFromLocalStorage = () => {
    let addressFromStorage: shippingDetail | null;
    let addressStringFromStorage = localStorage.getItem("addressDetail");
    if (addressStringFromStorage) {
      addressFromStorage = JSON.parse(addressStringFromStorage);
      return addressFromStorage;
    }
  };

  @observable cartItems: cartItem[] = this.itemsFromStorage() || [];

  @observable
  shippingDetail: shippingDetail = this.addressFromLocalStorage() || {
    Address: "",
    City: "",
    PostalCode: 0,
    Country: "",
  };

  @action updateShippingDetail = (detail: shippingDetail) => {
    localStorage.removeItem("addressDetail");
    localStorage.setItem("addressDetail", JSON.stringify(detail));
    this.shippingDetail = detail;
  };

  @action addToCart = async (id: string, qty: number) => {
    const { data } = await axios.get(`/api/products/${id}`);
    let cartItem: cartItem = {
      _id: data._id,
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      subcategory: data.subcategory,
    };

    let cartItemExists = this.cartItems.find(
      (x: { _id: number }) => x._id === cartItem._id
    );

    if (cartItemExists) {
      this.cartItems = this.cartItems.map((x) =>
        x._id === cartItemExists?._id ? cartItem : x
      );
    } else {
      this.cartItems = [...this.cartItems, cartItem];
    }
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  };
  @action removeFromCart = async (id: string) => {
    const { data } = await axios.get(`/api/products/${id}`);
    let indexToDelete = 0;
    let cartItemExists = this.cartItems.find(
      (x: { _id: number }, index: number) => {
        indexToDelete = index;
        return x._id === data._id;
      }
    );
    if (cartItemExists) {
      this.cartItems.splice(indexToDelete, 1);
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }
  };
}

export class UserStore {
  rootStore: any;
  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @observable userInfo: userInfo | undefined = userInfoFromStorage;

  @action updateUserInfo = (userInfo: userInfo | undefined) => {
    this.userInfo = userInfo;
  };
}

export class ProductStore {
  rootStore: any;
  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @observable products: prod[] = [];
  @observable product: prod = {
    _id: 0,
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    subcategory: "",
    reviews: [],
  };

  getProducts() {
    return this.products;
  }

  @action loadProducts = async () => {
    const { data } = await axios.get(`/api/products`);
    this.products = data;
    // getProducts().then((productsFromApi) => (this.products = productsFromApi));
  };

  @action loadProduct = async (id: string) => {
    const { data } = await axios.get(`/api/products/${id}`);
    this.product = data;
  };
}
// const rootStore = new RootStore();
export const rootStore = createContext(new RootStore());
