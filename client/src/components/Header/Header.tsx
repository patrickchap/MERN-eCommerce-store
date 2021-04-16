import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../RootStore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const Header: React.FC = observer(() => {
  const root = useContext(rootStore);
  const userStore = root.UserStore;
  const cartStore = root.CartStore;
  const { userInfo, updateUserInfo } = userStore;
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);

  const getSubTotalItems = () => {
    let total: number = 0;
    cartStore.cartItems.forEach((itm) => (total += itm.qty));
    return total;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAdmin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAdmin = () => {
    setAnchorElAdmin(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    updateUserInfo(undefined);
    localStorage.removeItem("userInfo");
  };

  const handleUserProfile = () => {
    history.push("/UserProfile");
    handleClose();
  };

  const handleUsersClick = () => {
    history.push("/userList");
    handleCloseAdmin();
  };

  const handleProductsClick = () => {
    history.push("/productsList");
    handleCloseAdmin();
  };

  // useEffect(() => {}, [userInfo]);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container__left">
          <div className="header__brand" onClick={() => history.push("/")}>
            Photo Store
          </div>

          {/* </NavLink> */}
        </div>
        <div className="header__container__right">
          <div className="header__container__right__cart">
            <div className="cart__inner" onClick={() => history.push("/cart")}>
              <Badge
                badgeContent={getSubTotalItems()}
                color="secondary"
                style={{ marginRight: "5px" }}
                invisible={getSubTotalItems() === 0}
              >
                <ShoppingCartIcon />
              </Badge>
              Cart
            </div>
          </div>
          <div className="header__container__right__signin">
            {userInfo ? (
              <div className="signin__inner">
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className="header__logout"
                  style={{ fontWeight: "bold" }}
                >
                  <div className="userName">
                    <PersonIcon style={{ paddingRight: "2px" }} />
                    {userInfo.name}
                    {!Boolean(anchorEl) ? (
                      <ArrowDropDownIcon />
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                  </div>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{ fontWeight: "bold" }}
                >
                  <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div
                className="signin__inner"
                onClick={() => history.push("/login")}
              >
                <PersonIcon />
                Sign In
              </div>
            )}
          </div>
          {userInfo && userInfo.isAdmin && (
            <div className="">
              <Button
                aria-controls="admin-menu"
                aria-haspopup="true"
                onClick={handleClickAdmin}
                className="header__logout"
                style={{ fontWeight: "bold" }}
                // id="admin--btn"
              >
                <div className="admin--btn">
                  Admin
                  {!Boolean(anchorElAdmin) ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowDropUpIcon />
                  )}
                </div>
              </Button>

              <Menu
                id="adminMenu"
                anchorEl={anchorElAdmin}
                keepMounted
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdmin}
              >
                <MenuItem onClick={handleUsersClick}>Users</MenuItem>
                <MenuItem onClick={handleProductsClick}>Products</MenuItem>
                <MenuItem>Orders</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Header;
