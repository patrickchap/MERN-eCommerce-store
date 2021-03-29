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
              {/* <Route exact path="/" component={HomeView} /> */}

              <Route exact path="/" component={HomeView} />
              <Route exact path="/shipping" component={ShippingView} />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/product/:id" component={ProductView} />
              <Route path="/cart/:id?" component={CartView} />
              <Route path="/register" component={RegisterUserView} />
              <Route path="/UserProfile" component={UserProfileView} />
              <Route
                path="/update/:infoToUpdate"
                component={UpdateUserInfoView}
              />
            </Switch>
          </div>
        </main>
        <div className="app__footer">{/* <Footer /> */}</div>
      </BrowserRouter>
    </div>
  );
});

export default App;
