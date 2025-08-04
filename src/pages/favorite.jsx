/* eslint-disable react-hooks/rules-of-hooks */
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useFav } from "../contexts/favoriteitems";
import { useCart } from "../contexts/CartItems";
import PageTransion from "../compnents/PageTransion";
import { useEffect } from "react";
export default function favorite() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { favItems, removeFromFav } = useFav();
  const { addToCart } = useCart();
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const reversedItems = [...favItems].reverse();
  useEffect(() => {
    document.title = "Favorites"
  },[])
  return (
    <PageTransion>
    <Container>
      {favItems.length === 0 ? (
        <p>no products in favorite</p>
      ) : (
        <Stack
          flexDirection={isSmallScreen ? "column" : "row"}
          spacing={2}
          gap={"100px"}
          sx={{ mt: 2 }}
          flexWrap={"wrap"}
        >
          {reversedItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: isSmallScreen ? "100%" : 300,
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "column",
                mb: 2,
                border: "1px solid #ddd",
              }}
              component={Link}
              to={`/products/${item.id}`}
            >
              <CardMedia
                component="img"
                sx={{ mt: "20px" }}
                height={"300"}
                image={item.images[0]}
              />
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <CardContent>
                  <Typography variant="h6" textAlign={"center"}>{item.title}</Typography>
                  <Typography variant="h5" color="primary" textAlign={"center"}>
                    
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      removeFromFav(item.id);
                      addToCart(item);
                    }}
                  >
                    move the product to cart
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      removeFromFav(item.id);
                    }}
                  >
                    delete
                  </Button>
                  {/* Add other actions like add to cart if needed */}
                </CardActions>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
    </PageTransion>
  );
}
