import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";
import "./UserListView.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory } from "react-router-dom";

const styles = {
  home: {
    width: "65%",
    margin: "0px auto",
    paddingTop: "30px",
  },
};

export const UserListView: React.FC = observer(() => {
  const root = useContext(rootStore);
  const { userList, getUserList, userInfo } = root.UserStore;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push("/");
    }

    getUserList();
  }, [getUserList, userList, userInfo, history]);

  return (
    <div className="userListView" style={styles.home}>
      <table className="userTable">
        <thead>
          {/* <tr className="userTable__tr"> */}
          <td>User Name</td>
          <td>Email</td>
          <td>isAdmin</td>
          <td>Delete</td>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <CheckBoxIcon style={{ cursor: "pointer" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon style={{ cursor: "pointer" }} />
                )}
              </td>
              <td>
                <DeleteForeverIcon style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
