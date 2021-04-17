import { observable, action, makeAutoObservable } from "mobx";
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

interface productReviewInputs {
  rating: number;
  comment: string;
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

interface putUserInput {
  name?: string;
  email?: string;
  password?: string;
}

interface updateProduct {
  name: string;
  price: number;
  countInStock: number;
  image: string;
  category: string;
  subcategory: string;
  description: string;
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

  shippingAndHandlingFromLocalStorage = () => {
    let sa = 0;
    let saString = localStorage.getItem("shippingAndHandling");
    if (saString) {
      sa = JSON.parse(saString);
      return sa;
    }
  };

  @observable cartItems: cartItem[] = this.itemsFromStorage() || [];
  @observable shippingAndHandling: number =
    this.shippingAndHandlingFromLocalStorage() || 0;

  @observable
  shippingDetail: shippingDetail = this.addressFromLocalStorage() || {
    Address: "",
    City: "",
    PostalCode: 0,
    Country: "",
  };

  @observable addressFlow: boolean = false;
  @observable deliveryFlow: boolean = false;
  @observable reviewFlow: boolean = false;
  @observable paymentFlow: boolean = false;

  @action updateDeliveryFlow = () => {
    this.deliveryFlow = true;
  };
  @action updateReviewFlow = () => {
    this.reviewFlow = true;
  };
  @action updatePaymentFlow = () => {
    this.paymentFlow = true;
  };

  @action updateShippingAndHandling = (sa: number) => {
    localStorage.removeItem("shippingAndHandling");
    localStorage.setItem("shippingAndHandling", JSON.stringify(sa));
    this.shippingAndHandling = sa;
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

  @observable userList: userInfo[] | undefined;

  @action getUserList = async () => {
    const config = {
      headers: { Authorization: "Bearer " + this.userInfo?.token },
    };
    const { data } = await axios.get("/api/users", config);
    this.userList = data;
  };

  @action putUserInfo = (userInfo: putUserInput) => {
    const config = {
      headers: { Authorization: "Bearer " + this.userInfo?.token },
    };
    axios
      .put("/api/users/profile", userInfo, config)
      .then((value) => value.data)
      .then((data) => {
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(data));
        this.userInfo = data;
      });
  };

  @action updateUserInfo = (userInfo: userInfo | undefined) => {
    this.userInfo = userInfo;
    // const { data } = await axios.put("/api/users/profile", {
    //   headers: { Authorization: "Bearer " + this.userInfo?.token },
    // });
    // localStorage.removeItem("userInfo");
    // localStorage.setItem("userInfo", JSON.stringify(data));
    // this.userInfo = data;
  };

  updateIsAdmin = async (id: string) => {
    const { data } = await axios.put(
      "/api/users/makeAdmin",
      { _id: id },
      {
        headers: { Authorization: "Bearer " + this.userInfo?.token },
      }
    );
  };

  deleteUser = async (id: string) => {
    axios.delete("/api/users/delete", {
      headers: {
        Authorization: "Bearer " + this.userInfo?.token,
      },
      data: {
        _id: id,
      },
    });
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

  postProductReview = async (
    review: productReviewInputs,
    id: string,
    token: string
  ) => {
    axios
      .post(
        `/api/products/${id}/review`,
        { rating: review.rating, comment: review.comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  createNewProduct = async (token: string) => {
    const { data } = await axios.post(
      `/api/products/create`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data._id;
  };

  deleteProduct = async (token: string, id: number) => {
    axios.delete(`/api/products/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  updateProduct = async (token: string, product: updateProduct, id: string) => {
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .put(`/api/products/update/${id}`, product, config)
      .then((value) => value.data)
      .then((data) => {
        console.log(data);
        // localStorage.removeItem("userInfo");
        // localStorage.setItem("userInfo", JSON.stringify(data));
        // this.userInfo = data;
      });
  };
}

// const rootStore = new RootStore();
export const rootStore = createContext(new RootStore());
