import React, { useState, useEffect, useContext } from "react";
import "./LoginView.css";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";
import { NavLink } from "react-router-dom";
// import Button from "@material-ui/core/Button";

type Inputs = {
  example: string;
  exampleRequired: string;
};

type UserType = {
  email: string;
  password: string;
};

const LoginView: React.FC<RouteComponentProps> = observer(
  ({ location, history }) => {
    const root = useContext(rootStore);
    const userStore = root.UserStore;
    const { userInfo, updateUserInfo } = userStore;
    const [error, setError] = useState<undefined | string>();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (e: UserType) => {
      axios
        .post("/api/users/login", { email: e.email, password: e.password })
        .then((res) => {
          setError(undefined);
          updateUserInfo(res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
        })
        .catch((err) => {
          setError(err.response.data.msg);
          console.log(err.response.data.msg);
        });
    };
    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
      if (userInfo) {
        history.push(redirect);
      }
    }, [history, redirect, userInfo]);

    return (
      <div className="loginView">
        <div className="loginView__container">
          <div className="loginView__title">
            <h3>Login to your account</h3>
          </div>

          <div className="loginView__error">
            {error && <Alert severity="error">{error}</Alert>}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="loginView__form">
            <label htmlFor="email" className="loginView__label">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter Email"
              type="email"
              ref={register}
              className="loginView__form__input"
              id="email"
            />
            <label htmlFor="password" className="loginView__label">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter Password"
              type="password"
              ref={register({ required: true })}
              className="loginView__form__input"
              id="password"
            />

            {errors.exampleRequired && <span>This field is required</span>}

            {/* <input type="submit" className="loginView__form__submit" /> */}
            <Button
              type="submit"
              variant="contained"
              className="loginView__form__submit"
            >
              Submit
            </Button>
          </form>
          <div className="loginView__register">
            <p>
              New Customer?{" "}
              <NavLink
                to="/register"
                // className="navlink"
                activeStyle={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default LoginView;
