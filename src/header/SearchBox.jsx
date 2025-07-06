import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack, Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export default function SearchBox() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

  }

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then(function (response) {
        // handle success
        setSuggestions(response.data.products.slice(0, 8));
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
        // setLoading(false);
      });
  }, [searchTerm]);


  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          mt: { xs: 1.5, sm: 0 },
          position: "relative",
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", sm: "400px", lg: "500px" },
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for products"
            inputProps={{ "aria-label": "search products" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

{searchTerm.trim()   ?  (
  <Stack
    flexDirection={"column"}
    sx={{
      width: {
        xs: "90%",   // للموبايل
        sm: "70%",   // للشاشات الصغيرة
        md: "50%",   // للشاشات المتوسطة فما فوق
      },
      height: "auto",
      maxHeight: "500px",
      position: "absolute",
      top: "100%", // يظهر تحت صندوق البحث لو حابب
      zIndex: 999,
      backgroundColor: "#f0f0f0",
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    {suggestions.map((item) => (
      <Stack
        key={item.id}
        onClick={() => {
          navigate(`/products/${item.id}`);
          setSearchTerm(""); // Clear the search input after selecting an item
          setSuggestions([]); // Clear suggestions after selecting an item
        }}
        sx={{
          width: "100%",
          padding: 1,
          "&:hover": {
            backgroundColor: "#e0e0e0",
            cursor: "pointer",
          },
        }}
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Avatar src={item.images[0]} sx={{ width: 40, height: 40 }} />
        <Typography variant="body1" color="text.primary" noWrap>
          {item.title}
        </Typography>
      </Stack>
    ))}
  </Stack>
) : null}


    </div>
  );
}
