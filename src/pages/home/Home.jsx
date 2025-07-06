import React, { useEffect, useState } from "react";
import "./home.css";
import SlideProducts from "../../compnents/products/SlideProducts";
import LoadingCompnent from "../../compnents/LoadingCompnent";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartItems";
import PageTransion from "../../compnents/PageTransion";

export default function Home() {
  const { cartItems } = useCart();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  });

  const categories = [
    "smartphones",
    "laptops",
    "tablets",
    "furniture",
    "mens-shirts",
    "mobile-accessories",
    "beauty",
    "sunglasses",
    "tops",
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allResponses = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();

            return { [category]: data.products };
          })
        );

        // دمج كل المنتجات من التصنيفات إلى كائن واحد
        const allProducts = Object.assign({}, ...allResponses);

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      {loading ? (
        <LoadingCompnent />
      ) : (
        categories.map((category) => {
          return (
            <PageTransion key={category}>
              <SlideProducts
                key={category}
                data={products[category]}
                title={category}
              />
              <IconButton
                style={{
                  transition: ".8s",
                  opacity: showScroll ? 1 : 0,
                  position: "fixed",
                  bottom: "20px",
                  right: "10px",
                  borderRadius: "50%",
                  width: { xs: "50px", sm: "120px" },
                  height: { xs: "50px", sm: "120px" },
                  backgroundColor: "#0090f0",
                  padding: {xs: "10px", sm: "20px"},
                  zIndex: 1000,
                }}
                component={Link}
                to={"/cart"}
                // variant="contained"
              >
                <Badge
                  badgeContent={cartItems.length === 0 ? "0" : cartItems.length}
                  color={"primary"}
                >
                  <ShoppingCart sx={{ color: "#fff" }} fontSize="50px" />
                </Badge>
              </IconButton>
            </PageTransion>
          );
        })
      )}


    </div>
  );
}
