import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import { rootStore } from "../../RootStore";
import NumberFormat from "react-number-format";

const OrderSummary: React.FC = observer(() => {
  const root = useContext(rootStore);
  const { cartItems, shippingAndHandling } = root.CartStore;

  const getSubTotal = () => {
    let total: number = 0;
    cartItems.forEach((itm) => (total += itm.qty * itm.price));
    return total;
  };

  return (
    <div className="orderSummary">
      <Card>
        <CardHeader
          title="Order Summary"
          style={{
            backgroundColor: "black",
            color: "white",
            height: "36px ",
            padding: "0px",
            textAlign: "center",
          }}
        />
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="row--left">Order Subtotal</div>
            <div className="row--right">
              {
                <NumberFormat
                  value={getSubTotal().toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              }
            </div>
          </div>
          <Divider />
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="row--left">Shipping and Handling</div>
            <div className="row--right">
              {
                <NumberFormat
                  value={shippingAndHandling.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              }
            </div>
          </div>
          <Divider />

          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="row--left">Total</div>
            <div className="row--right">
              {
                <NumberFormat
                  value={(shippingAndHandling + getSubTotal()).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default OrderSummary;
