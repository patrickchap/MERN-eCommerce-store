import React from "react";
import "./ReviewView.css";
import { observer } from "mobx-react-lite";

interface props {
  ShippingFlow: React.FC<{}>;
}

const ReviewView: React.FC<props> = observer(({ ShippingFlow }) => {
  return (
    <div className="reviewView">
      ReviewView
      <ShippingFlow />
    </div>
  );
});

export default ReviewView;
