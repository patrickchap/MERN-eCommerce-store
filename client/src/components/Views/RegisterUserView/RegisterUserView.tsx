import React, { useState, useContext, useEffect } from "react";
import "./RegisterUserView.css";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";

type Inputs = {
  example: string;
  exampleRequired: string;
};

type RegisterUserInfo = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const RegisterUserView: React.FC<RouteComponentProps> = observer(
  ({ location, history }) => {
    const root = useContext(rootStore);
    const userStore = root.UserStore;
    const { userInfo, updateUserInfo } = userStore;
    const [error, setError] = useState<undefined | string>();
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const onSubmit = (e: RegisterUserInfo) => {
      console.log(e);
      if (e.password !== e.confirm) {
        setError("Password doesn't match");
      } else {
        setError(undefined);
        axios
          .post("/api/users", {
            name: e.name,
            email: e.email,
            password: e.password,
          })
          .then((res) => {
            updateUserInfo(res.data);
            setError(undefined);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            history.push(redirect);
          })
          .catch((err) => {
            console.log(err.response.data.msg);
            setError(err.response.data.msg);
          });
      }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/";

    return (
      <div className="registerUserView">
        <div className="registerUserView__container">
          <div className="registerUserView__error">
            {error && <Alert severity="error">{error}</Alert>}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="registerUserView__form"
          >
            <label htmlFor="name" className="registerUserView__label">
              Name
            </label>
            <input
              name="name"
              placeholder="Enter Name"
              type="text"
              ref={register({ required: true })}
              className="registerUserView__form__input"
              id="name"
            />
            <label htmlFor="email" className="registerUserView__label">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter Email"
              type="email"
              ref={register({ required: true })}
              className="registerUserView__form__input"
              id="email"
            />
            <label htmlFor="password" className="registerUserView__label">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter Password"
              type="password"
              ref={register({ required: true })}
              className="registerUserView__form__input"
              id="password"
            />

            <label htmlFor="confirm" className="registerUserView__label">
              Confirm Password
            </label>
            <input
              name="confirm"
              placeholder="Confirm Password"
              type="password"
              ref={register({ required: true })}
              className="registerUserView__form__input"
              id="confirm"
            />

            {errors.exampleRequired && <span>This field is required</span>}

            {/* <input type="submit" className="loginView__form__submit" /> */}
            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
);

export default RegisterUserView;
