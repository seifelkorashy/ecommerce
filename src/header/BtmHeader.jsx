import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Divider, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { Logout } from "@mui/icons-material";

const pages = [
  { title: "home", link: "/" },
  { title: "cart", link: "/cart" },
  { title: "favorites", link: "/favorite" },
];
export default function BtmHeader() {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const location = useLocation().pathname;

  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box sx={{ minWidth: 150 }}>
              <FormControl
                fullWidth
                sx={{
                  background: "white",
                  border: "none",
                  outline: "none",
                  color: "black",
                }}
                size="small"
              >
                <InputLabel>Categories</InputLabel>
                <Select
                  value={category}
                  label="Categories"
                  onChange={handleChange}
                >
                  {categories.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={category.slug}
                      onClick={() => {
                        navigate(`/category/${category.slug}`);
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box></Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        textDecoration: "none",
                        color: location === page.link ? "white" : "black",
                        background: location === page.link ? "blue" : "",
                        width: "100%",
                      }}
                      component={Link}
                      to={page.link}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider sx={{ borderColor: "black" }}></Divider>
                {currentUser ? (
                  <Button
                    variant="primary"
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      margin: "0 10px",
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                    onClick={async () => {
                      setError("");
                      try {
                        await logOut();
                        navigate("/login");
                      } catch (error) {
                        setError("faild to log out");
                        console.log(error);
                      }
                    }}
                  >
                    Logout <Logout fontSize="14px" />
                  </Button>
                ) : null}
              </Menu>
            </Box>
          </Stack>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Typography
                key={page.title}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  background: location === page.link ? "#0090f0" : "",
                  margin: "0 10px",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                {page.title}
              </Typography>
            ))}

            {currentUser ? (
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderColor: "white" }}
                ></Divider>
                <Button
                  variant="primary"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    margin: "0 10px",
                    borderRadius: "5px",
                  }}
                  onClick={async () => {
                    setError("");
                    try {
                      await logOut();
                      navigate("/login");
                    } catch (error) {
                      setError("faild to log out");
                      console.log(error);
                    }
                  }}
                >
                  logout <Logout />
                </Button>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>

      <Typography
        variant="body1"
        textAlign={"center"}
        sx={{
          backgroundColor: "#0090f0",
          width: "100%",
          marginLeft: "auto",
          color: "#fff",
          padding: "5px",
          fontSize: "17px",
        }}
      >
        {currentUser ? `Welcome, ${currentUser.displayName}` : error}
      </Typography>
    </>
  );
}
