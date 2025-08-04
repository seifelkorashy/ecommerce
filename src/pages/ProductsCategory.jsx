import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SlideProducts from "../compnents/products/SlideProducts";
import LoadingCompnent from "../compnents/LoadingCompnent";
import PageTransion from "../compnents/PageTransion";

export default function ProductsCategory() {
  const { cat } = useParams();
  const [productsCat, setProductsCat] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${cat}`)
      .then(function (response) {
        // handle success
        setProductsCat(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }, [cat]);

  useEffect(() => {
    document.title = `${cat.toLocaleUpperCase()}`
  } ,[cat])
  
  return (
    <PageTransion>
      {loading ? (
        <LoadingCompnent/>
      ) : (
        <SlideProducts
          data={productsCat}
          title={cat}
        />
      )}
    </PageTransion>
  )
}
