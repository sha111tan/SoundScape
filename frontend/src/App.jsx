import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import HomeScreen from "./pages/Home";
import CatalogScreen from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import CartScreen from "./pages/Cart";
import OrderScreen from "./pages/Order";
import OrderInfo from "./pages/OrderInfo";
import ProfileScreen from "./pages/ProfileScreen";

import NoMatch from "./pages/NoMatch";
import UsersList from "./pages/UserList";
import AddProduct from "./pages/AddProduct";
import Orderslist from "./pages/Orderlist";
import ProductList from "./pages/ProductList";
import Marquee from "./components/Marquee";
import FadeIn from "./components/FadeIn";
import { Footer } from "./components/Footer";
import "./App.css";
import LoadPage from "./components/LoadPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Marquee
          phrases={[
            "Распродажа: скидки до 50% на наушники, колонки и аудиосистемы! Только в SoundScape!",
            "Следите за новинками в мире звука с SoundScape. Обновления каждую неделю!",
            "Ограниченное предложение: купите любую аудиосистему и получите наушники в подарок!",
            "Покупайте с уверенностью – лучшие бренды по лучшим ценам!",
          ]}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/catalog" element={<CatalogScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/catalog/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/orderinfo/:orderid" element={<OrderInfo />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
