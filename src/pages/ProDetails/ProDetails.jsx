import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingCompnent from "../../compnents/LoadingCompnent";
import { Box, Container, Stack, Typography, Button, IconButton } from "@mui/material";
import { Star, ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import SlideProducts from "../../compnents/products/SlideProducts";
import { useCart } from "../../contexts/CartItems";
import { Done } from "@mui/icons-material";
import { useFav } from "../../contexts/favoriteitems";
import PageTransion from "../../compnents/PageTransion";
  
export default function ProDetails() {
  let { id } = useParams();
  const [pro, setPro] = useState([]);
  const [slideCategory, setSlideCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  const { addToFav, favItems } = useFav();

  

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        // handle success
        setPro(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }, [id]);

  

  const isInCart = cartItems.some((i) => {
    return i.id === pro.id;
  });
  const isInFav = favItems.some((i) => {
    return i.id === pro.id;
  });

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${pro.category}`)
      .then(function (response) {
        // handle success
        setSlideCategory(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      });
  }, [pro?.category]);


  if (loading) return <LoadingCompnent />;
  if (!pro) return <p>product not found</p>;
  return (
    <PageTransion>
      <Container maxWidth={"lg"} sx={{ marginTop: 3 }}>
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
        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={"center"}
          gap={"25px"}
        >
          <Stack direction={"column"} spacing={2}>
            <img id="big-img" src={pro.images[0]} alt="" width={"350px"} />

            <Stack direction={"row"}>
              {pro.images.map((img, index) => {
                return (
                  <img
                    src={img}
                    alt=""
                    key={index}
                    width={"100px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      document.getElementById("big-img").src = img;
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>

          <Stack gap={"10px"}>
            <Typography variant="h5" color="#0090f0">
              {pro.title}
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

            <Typography variant="body1" color="initial">
              ${pro.price}
            </Typography>

            <Typography variant="body1" color="initial">
              availability:{" "}
              <span style={{ color: "#0090f0", fontSize: "20px" }}>
                {pro.availabilityStatus}
              </span>
            </Typography>
            <Typography variant="body1" color="initial">
              brand:{" "}
              <span style={{ color: "#0090f0", fontSize: "20px" }}>
                {pro.brand}
              </span>
            </Typography>

            <Typography variant="body1" color="#7b7b7b" lineHeight={1.5}>
              {pro.description}
            </Typography>

            <Button
              variant="contained"
              endIcon={<ShoppingCart />}
              sx={{ width: "fit-content" }}
              onClick={() => {
                addToCart(pro);
              }}
              disabled={isInCart ? true : false}
            >
              add to cart
            </Button>

            <IconButton  sx={{width:"fit-content"}} onClick={() => {addToFav(pro)}} disabled={isInFav ? true : false}>
                <FavoriteBorder sx={{ color: "#0090f0" }} />
            </IconButton>

          </Stack>
        </Stack>
      </Container>

      <SlideProducts data={slideCategory} title={pro.category} />
    </PageTransion>
  );
}
