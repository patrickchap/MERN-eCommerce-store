import React, { useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomeView from "./components/Views/HomeView/HomeView";
import ProductView from "./components/Views/ProductView/ProductView";
import { observer } from "mobx-react-lite";
import { rootStore } from "./RootStore";
import CartView from "./components/Views/CartView/CartView";
import LoginView from "./components/Views/LoginView/LoginView";
import RegisterUserView from "./components/Views/RegisterUserView/RegisterUserView";
import UserProfileView from "./components/Views/UserProfileView/UserProfileView";
import UpdateUserInfoView from "./components/Views/UpdateUserInfoView/UpdateUserInfoView";
import ShippingView from "./components/Views/ShippingView/ShippingView";
import ShippingFlow from "./components/ShippingFlow/ShippingFlow";
import DeliveryView from "./components/Views/DeliveryView/DeliveryView";
import ReviewView from "./components/Views/ReviewView/ReviewView";
import PaymentView from "./components/Views/PaymentView/PaymentView";
import ProductReviewView from "./components/Views/ProductReviewView/ProductReviewView";
import { UserListView } from "./components/Views/UserListView/UserListView";
import ProductListView from "./components/Views/ProductListView/ProductListView";

const App: React.FC = observer(() => {
  const root = useContext(rootStore);
  const productStore = root.ProductStore;

  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);

  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__header">
          <Header />
        </div>
        <main>
          <div className="app__body">
            <Switch>
              <Route exact path="/" component={HomeView} />

              <Route
                exact
                path="/shipping/address"
                component={() => (
                  <ShippingView
                    ShippingFlow={() => <ShippingFlow step={0} />}
                  />
                )}
              />
              <Route
                exact
                path="/shipping/delivery"
                component={() => (
                  <DeliveryView
                    ShippingFlow={() => <ShippingFlow step={1} />}
                  />
                )}
              />
              <Route
                exact
                path="/shipping/review"
                component={() => (
                  <ReviewView ShippingFlow={() => <ShippingFlow step={2} />} />
                )}
              />

              <Route
                exact
                path="/shipping/payment"
                component={() => (
                  <PaymentView ShippingFlow={() => <ShippingFlow step={3} />} />
                )}
              />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/product/:id" component={ProductView} />
              <Route
                exact
                path="/product/review/:id"
                component={ProductReviewView}
              />
              <Route path="/cart/:id?" component={CartView} />
              <Route path="/register" component={RegisterUserView} />
              <Route path="/UserProfile" component={UserProfileView} />
              <Route
                path="/update/:infoToUpdate"
                component={UpdateUserInfoView}
              />

              <Route path="/userList" component={UserListView} />
              <Route path="/productsList" component={ProductListView} />
            </Switch>
          </div>
        </main>
        <div className="app__footer">{/* <Footer /> */}</div>
      </BrowserRouter>
    </div>
  );
});

export default App;
