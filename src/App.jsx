import BtmHeader from "./header/BtmHeader";
import TopHeader from "./header/TopHeader";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import ProDetails from "./pages/ProDetails/ProDetails";
import CartProvider from "./contexts/CartItems";
import Cart from "./pages/cart";
import ProductsCategory from "./pages/ProductsCategory";
import Favorite from "./pages/favorite";
import FavProvider from "./contexts/favoriteitems";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import { useAuth } from "./contexts/AuthContext";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  const { currentUser } = useAuth();

  return (
    <CartProvider>
      <FavProvider>
        {currentUser ? (
          <>
            <header style={{ width: "100% " }}>
              <TopHeader />
              <BtmHeader />
            </header>
          </>
        ) : null}
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/products/:id" element={<ProDetails />}></Route>
            <Route path="/category/:cat" element={<ProductsCategory />}></Route>
            <Route path={"/signup"}  element={ <Signup />}/>
            <Route path="/login"  element={ <Login />} />
            <Route path="/forgot-password" element={ <ForgotPassword />} />


          </Routes>
        </AnimatePresence>
      </FavProvider>
    </CartProvider>
  );
}

export default App;
