import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import "./ShippingFlow.css";
import { useHistory } from "react-router-dom";
import { rootStore } from "../../RootStore";

interface props {
  step: number;
}

const blackButton = { backgroundColor: "black", color: "white", flex: ".25" };
const grayButton = { flex: ".25" };

const ShippingFlow: React.FC<props> = observer(({ step }) => {
  const root = useContext(rootStore);
  const { deliveryFlow, reviewFlow, paymentFlow } = root.CartStore;

  let history = useHistory();
  const [steps] = useState([
    <Button
      style={grayButton}
      onClick={() => history.push("/shipping/address")}
    >
      Address
    </Button>,
    <Button
      style={grayButton}
      onClick={() => history.push("/shipping/delivery")}
      disabled={!deliveryFlow}
    >
      Delivery
    </Button>,
    <Button
      style={grayButton}
      onClick={() => history.push("/shipping/review")}
      disabled={!reviewFlow}
    >
      Review
    </Button>,
    <Button
      style={grayButton}
      onClick={() => history.push("/shipping/payment")}
      disabled={!paymentFlow}
    >
      Payment
    </Button>,
  ]);

  const [stepsBlack] = useState([
    <Button
      onClick={() => history.push("/shipping/address")}
      style={blackButton}
    >
      Address
    </Button>,
    <Button
      onClick={() => history.push("/shipping/delivery")}
      style={blackButton}
    >
      Delivery
    </Button>,
    <Button
      style={blackButton}
      onClick={() => history.push("/shipping/review")}
    >
      Review
    </Button>,
    <Button
      style={blackButton}
      onClick={() => history.push("/shipping/payment")}
    >
      Payment
    </Button>,
  ]);

  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="contained primary button group"
        style={{
          justifySelf: "center",
          display: "flex",
        }}
      >
        {steps.map((stp, idx) => {
          if (idx === step) {
            return stepsBlack[idx];
          } else return stp;
        })}
      </ButtonGroup>
    </div>
  );
});

export default ShippingFlow;
