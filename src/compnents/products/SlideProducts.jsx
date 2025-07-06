import React from "react";
import Products from "./Products";
import { Box, Container, Typography } from "@mui/material";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// import './styles.css';

// import required modules
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import { Scrollbar } from "swiper/modules";
export default function SlideProducts({ title, data }) {


  return (
    <div>
      <Box className="slide-products" sx={{ gap: 2, mb: 8 }}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" color="#0090f0">
              {title} : {data.length} Products
            </Typography>
          </Box>

          {/* هنا يمكنك إضافة أي محتوى آخر تريده */}
          <Swiper
            loop={true}
            autoplay={{ delay: 3000 }}
            slidesPerView={5}
            keyboard={{
              enabled: true,
            }}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar, Navigation, Keyboard, Autoplay]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 5,
              },
              1536: {
                slidesPerView: 5,
              },
            }}
          >
            {data.map((product) => (
              <SwiperSlide key={product.id}>
                <Products product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
    </div>
  );
}
