import React, { useContext } from "react";
import "./UserProfileView.css";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { RouteComponentProps } from "react-router";

const UserProfileView: React.FC<RouteComponentProps> = observer(
  ({ history }) => {
    const root = useContext(rootStore);
    const userStore = root.UserStore;
    const { userInfo } = userStore;

    return (
      <div className="userProfileView">
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <div className="userProfileView__listItem">
                  <div className="userProfileView__listItem__left">
                    <h4>Name: </h4>
                    <p>{userInfo?.name}</p>
                  </div>
                  <div className="userProfileView__listItem__right">
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        history.push("/login?redirect=update/name");
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </ListItem>
              <Divider />
              <ListItem>
                <div className="userProfileView__listItem">
                  <div className="userProfileView__listItem__left">
                    <h4>Email: </h4>
                    <p>{userInfo?.email}</p>
                  </div>
                  <div className="userProfileView__listItem__right">
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        history.push("/login?redirect=update/email");
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </ListItem>
              <Divider />
              <ListItem>
                <div className="userProfileView__listItem">
                  <div className="userProfileView__listItem__left">
                    <h4>Password</h4>
                    <p>********</p>
                  </div>
                  <div className="userProfileView__listItem__right">
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        history.push("/login?redirect=update/password");
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
);

export default UserProfileView;
