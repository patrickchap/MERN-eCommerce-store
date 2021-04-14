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

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container__left">
          <NavLink
            to="/"
            id="header_Brand"
            className="navlink"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Photo Store
          </NavLink>
        </div>
        <div className="header__container__right">
          <div className="header__container__right__cart">
            <NavLink
              to="/cart"
              className="navlink"
              activeStyle={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              <div className="cart__inner">
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
            </NavLink>
          </div>
          <div className="header__container__right__signin">
            {userInfo ? (
              <div className="signin__inner">
                <PersonIcon />
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className="header__logout"
                >
                  {userInfo.name}
                  {!Boolean(anchorEl) ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowDropUpIcon />
                  )}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="navlink"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                <div className="signin__inner">
                  <PersonIcon />
                  Sign In
                </div>
              </NavLink>
            )}
          </div>
          {userInfo && userInfo.isAdmin && (
            <div className="">
              <Button
                aria-controls="admin-menu"
                aria-haspopup="true"
                onClick={handleClickAdmin}
                className="header__logout"
              >
                {userInfo.name}
                {!Boolean(anchorElAdmin) ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </Button>

              <Menu
                id="adminMenu"
                anchorEl={anchorElAdmin}
                keepMounted
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdmin}
              >
                <MenuItem onClick={handleUsersClick}>Users</MenuItem>
                <MenuItem>Products</MenuItem>
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
