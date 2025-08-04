import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import "./header.css";
import { useCart } from "../contexts/CartItems";
import { useFav } from "../contexts/favoriteitems";
import SearchBox from "./SearchBox";
export default function TopHeader() {
  const { cartItems } = useCart();
  const { favItems } = useFav();


  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton size="large" color="inherit">
            <Badge
              badgeContent={cartItems.length === 0 ? 0 : cartItems.length}
              color="primary"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            Cart
          </Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/favorite"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton size="large">
            <Badge
              badgeContent={favItems.length === 0 ? "0" : favItems.length}
              color="primary"
            >
              <FavoriteBorder />
            </Badge>
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            Favorites
          </Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position= "static" className="top-header">
        <Toolbar
          sx={{
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "space-between",
          }}
          className="top-header-toolbar"
        >
          {/* Logo and Menu Icon */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              width: { xs: "100%", md: "" },
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <Box
                component="img"
                src="/img/logo.png"
                alt="Logo"
                sx={{ width: "100px" }}
              />
            </Link>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Stack>

          <SearchBox />

          {/* Icons - Only show on md and up */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexDirection: "row-reverse",
              gap: "20px",
            }}
          >
            <Link to={"/favorite"} style={{ color: "#000" }}>
              <Badge
                badgeContent={favItems.length === 0 ? "0" : favItems.length}
                color="primary"
              >
                <FavoriteBorder />
              </Badge>
            </Link>

            <Link style={{ color: "#000" }} to={"/cart"}>
              <Badge
                badgeContent={cartItems.length === 0 ? "0" : cartItems.length}
                color="primary"
              >
                <ShoppingCart />
              </Badge>
            </Link>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        {renderMobileMenu}
      </AppBar>
    </>
  );
}
