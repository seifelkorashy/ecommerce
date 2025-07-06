import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  Stack,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder, Star, Done } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartItems";
import { useFav } from "../../contexts/favoriteitems";


export default function Products({ product }) {

  const { addToCart, cartItems } = useCart();
  const { addToFav, favItems } = useFav();

  const isInCart = cartItems.some((i) => {
    return i.id === product.id;
  });

  const isInFav = favItems.some((i) => {
    return i.id === product.id;
    
  });



  return (
    <>
      <Container sx={{ mt: 2, mb: 2 }}>
        <Grid
          container
          spacing={1}
          sx={{ position: "relative", overflow: "hidden" }}
          className="grid"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                border: "1px solid #ddd",
              }}
              className="product"
              component={Link}
              to={`/products/${product.id}`}
            >
              {isInCart ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"5px"}
                  sx={{
                    backgroundColor: "#e0ffe0",
                    padding: "5px",
                    borderRadius: "8px",
                    width: "fit-content",
                    margin: "auto",
                    mt: 2,
                  }}
                >
                  <Done sx={{ fontSize: "15px", color: "green" }} />
                  <Typography variant="body1">in cart </Typography>
                </Stack>
              ) : null}
              <CardMedia
                component="img"
                image={product.images[0]}
                height={"140"}
                sx={{ mt: "20px" }}
              />

              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#0090f0" }}
                  className="text"
                >
                  {product.title}
                </Typography>
                <Box color={"yellow"}>
                  <span>
                    <Star />
                  </span>
                  <span>
                    <Star />
                  </span>
                  <span>
                    <Star />
                  </span>
                  <span>
                    <Star />
                  </span>
                  <span>
                    <Star />
                  </span>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
            <Stack className="icons">
              <button
                onClick={() => {
                  addToCart(product);
                }}
                disabled={isInCart ? true : false}
              >
                <ShoppingCart />
              </button>

              <button
              style={{background:isInFav ? "#999" : "#0090f0"}}
                onClick={() => {
                  addToFav(product);
                  
                }}
                 disabled={isInFav ? true : false}
              >

                <FavoriteBorder />
              </button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
