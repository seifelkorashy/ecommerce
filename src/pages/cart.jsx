import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ArrowCircleLeft, Delete, Info } from "@mui/icons-material";
import React from "react";
import { useCart } from "../contexts/CartItems";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import PageTransion from "../compnents/PageTransion";
export default function cart() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {cartItems,setCartItems,removeFromCart,increaseQuantity, decreaseQuantity,} = useCart();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const reversedItems = [...cartItems].reverse();

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <PageTransion>
    <Container
      maxWidth={"md"}
      sx={{
        border: "2px solid #ddd",
        height: "60vh",
        mt: 2,
        overflowY: "auto",
      }}
    >
      <Stack
        direction={ isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {cartItems.length > 1 ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={() => {
                localStorage.clear();
                setCartItems([]);
              }}
            >
              Delete All Products
            </Button>
          </Box>
        ) : null}


         {cartItems.length ===  0  ? (
            null
         ) : (

        <Typography variant="body1" color="#0090f0" sx={{ mt: 2 }}>
          total price : ${totalPrice.toFixed(2)} 
        </Typography>
         )}
      </Stack>

      {cartItems.length === 0 ? (
        <Stack  mt={1} gap={"20px"}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0090f0",
            }}
          >
            cart is empty
          </p>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "fit-content", margin: "auto" }}
            startIcon={<ArrowCircleLeft />}
          >
            <Link to={"/"} style={{ color: "white" }}>
              back to home page to add product
            </Link>
          </Button>
        </Stack>
      ) : (
        reversedItems.map((item) => {
          return (
            <Stack
              key={item.id}
              direction={isSmallScreen ? "column" : "row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={3}
              sx={{
                mt: 3,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "10px",
                flexWrap: "wrap",
                boxShadow: 1,
                width: "100%",
              }}
            >
              {/* صورة المنتج */}
              <img
                id="big-img"
                src={item.images[0]}
                alt={item.title}
                width={isSmallScreen ? "100%" : "150px"}
                style={{ borderRadius: "10px", objectFit: "contain" }}
              />

              {/* تفاصيل المنتج */}
              <Stack
                spacing={2}
                alignItems={isSmallScreen ? "center" : "flex-start"}
                textAlign={isSmallScreen ? "center" : "left"}
                sx={{ flex: 1 }}
              >
                <Typography variant="h6" color="#0090f0">
                  {item.title}
                </Typography>

                <Typography variant="body1">${item.price}</Typography>

                <Typography variant="body1">
                  Brand:{" "}
                  <span style={{ color: "#0090f0", fontSize: "18px" }}>
                    {item.brand}
                  </span>
                </Typography>

                {/* التحكم في الكمية */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      increaseQuantity(item.id), console.log(item.id);
                    }}
                  >
                    +
                  </Button>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                </Stack>
              </Stack>

              {/* زر الحذف */}
              <IconButton
                onClick={() => {
                  removeFromCart(item.id);
                }}
              >
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </Stack>
          );
        })
      )}
    </Container>
    </PageTransion>
  );
}
