import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./CartView.css";
import DeleteIcon from "@material-ui/icons/Delete";
import NumberFormat from "react-number-format";
//

interface params {
  id?: string | undefined;
  qty?: string | undefined;
}

const createArray = (size: number): Array<number> => {
  let arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  return arr;
};

const CartView: React.FC<RouteComponentProps> = observer(
  ({ location, history }) => {
    const { id } = useParams<params>();
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const root = useContext(rootStore);
    const cartStore = root.CartStore;
    const { cartItems } = root.CartStore;

    const getSubTotalInDollars = () => {
      let total: number = 0;
      cartStore.cartItems.forEach((itm) => (total += itm.price * itm.qty));
      return total;
    };

    const getSubTotalItems = () => {
      let total: number = 0;
      cartStore.cartItems.forEach((itm) => (total += itm.qty));
      return total;
    };

    useEffect(() => {
      if (id) {
        cartStore.addToCart(id, qty);
      }
    }, [cartStore, id, qty]);

    return (
      <div className="cart">
        {cartItems.length === 0 ? (
          <div className="cart__left">
            <div className="cart__left__listItem">
              <Card
                className="cart__left__listItem__card"
                style={{
                  marginTop: "20px",
                  height: "150px",
                  alignContent: "center",
                  padding: "0px",
                }}
              >
                <CardContent
                  style={{
                    alignContent: "center",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <h3>Your Cart is empty.</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="cart__left">
            <List>
              {cartItems.map((itm, idx) => {
                return (
                  <div className="cart__left__listItem">
                    <ListItem>
                      {
                        //   itm.description
                        <Card className="cart__left__listItem__card">
                          <CardContent>
                            <div className="cart__left__listItem__cardContent">
                              <img
                                src={itm.image}
                                alt="item"
                                className="cart__left__listItem__img"
                              />
                              <p>{itm.name}</p>
                              <p>{`$${itm.price}`}</p>
                              <FormControl>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={itm.qty}
                                  onChange={(e) =>
                                    cartStore.addToCart(
                                      String(itm._id),
                                      Number(e.target.value)
                                    )
                                  }
                                >
                                  {createArray(itm.countInStock).map((num) => {
                                    return (
                                      <MenuItem value={num}>{num}</MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                              <DeleteIcon
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  cartStore.removeFromCart(String(itm._id))
                                }
                              />
                            </div>
                          </CardContent>
                        </Card>
                      }
                    </ListItem>

                    {idx === cartItems.length - 1 && (
                      <>
                        <Divider />
                        <p>
                          {`Subtotal (${getSubTotalItems()}) Items: `}
                          <NumberFormat
                            value={getSubTotalInDollars().toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </List>
          </div>
        )}
        <div className="cart__right">
          <List>
            <ListItem>
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      {`Subtotal (${getSubTotalItems()}) Items`}
                    </ListItem>
                    <ListItem>
                      <NumberFormat
                        value={getSubTotalInDollars().toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        onClick={() => history.push("/login?redirect=shipping")}
                        //   disabled={product?.countInStock === 0}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        Checkout
                      </Button>
                      {/* </NavLink> */}
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
);

export default CartView;
