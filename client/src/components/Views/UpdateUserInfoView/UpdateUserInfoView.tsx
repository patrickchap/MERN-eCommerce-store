import React, { useContext } from "react";
import "./UpdateUserInfoView.css";
import { RouteComponentProps, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { rootStore } from "../../../RootStore";

interface params {
  infoToUpdate: string | undefined;
}

interface putUserInfo {
  name?: string;
  email?: string;
  password?: string;
}

const formStyle = {
  marginTop: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
} as React.CSSProperties;

const UpdateUserInfoView: React.FC<RouteComponentProps> = ({ history }) => {
  const { infoToUpdate } = useParams<params>();
  const { register, handleSubmit, errors } = useForm<putUserInfo>();
  const root = useContext(rootStore);
  const { putUserInfo } = root.UserStore;

  const onSubmit = (e: putUserInfo) => {
    putUserInfo(e);
  };

  return (
    <div className="updateUserInfoView">
      <Button
        type="button"
        style={{
          color: "white",
          backgroundColor: "black",
          alignItems: "center",
        }}
        onClick={() => {
          history.push("/login?redirect=/UserProfile");
        }}
      >
        Back to Profile
      </Button>

      <div className="updateUserInfo__form" style={{ width: "100%" }}>
        {infoToUpdate === "name" ? (
          <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="shippingView__label">
              Name
            </label>
            <input
              name="name"
              placeholder="Enter Name"
              type="text"
              ref={register({ required: true })}
              className="shippingView__form__input"
              id="name"
              // value={address}
              // onChange={(e) => handleAddressChange(e)}
            />

            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Update Name
            </Button>
          </form>
        ) : infoToUpdate === "email" ? (
          <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="shippingView__label">
              Email
            </label>
            <input
              name="email"
              placeholder="Enter Email"
              type="text"
              ref={register()}
              className="shippingView__form__input"
              id="email"
              // value={address}
              // onChange={(e) => handleAddressChange(e)}
            />

            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Update Email
            </Button>
          </form>
        ) : (
          <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="password" className="shippingView__label">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter Password"
              type="password"
              ref={register({ required: true })}
              className="shippingView__form__input"
              id="password"
              // value={address}
              // onChange={(e) => handleAddressChange(e)}
            />

            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Update Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateUserInfoView;
