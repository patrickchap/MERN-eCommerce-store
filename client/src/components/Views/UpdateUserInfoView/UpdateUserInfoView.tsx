import React, { useEffect } from "react";
import "./UpdateUserInfoView.css";
import { RouteComponentProps, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

interface params {
  infoToUpdate: string | undefined;
}

const name = <div>name</div>;
const email = <div>email</div>;
const password = <div>password</div>;

const UpdateUserInfoView: React.FC<RouteComponentProps> = ({ history }) => {
  const { infoToUpdate } = useParams<params>();

  //   useEffect(() => {
  //     console.log(infoToUpdate);
  //   }, [infoToUpdate]);

  return (
    <div className="updateUserInfoView">
      <Button
        style={{
          color: "white",
          backgroundColor: "black",
          alignItems: "center",
        }}
        onClick={() => {
          history.push("/login?redirect=/UserProfile");
        }}
      >
        Profile
      </Button>
      {infoToUpdate === "name"
        ? name
        : infoToUpdate === "email"
        ? email
        : password}
    </div>
  );
};

export default UpdateUserInfoView;
