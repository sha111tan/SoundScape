import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import { useEffect } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { getAllProducts } from "../redux/product.slice";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./Login";
import FadeIn from "../components/FadeIn";
import { motion } from "framer-motion";

import "../App.css";

export default function CatalogScreen() {
  const getallproductstate = useSelector((state) => state.productReducer);
  const loginReducer = useSelector((state) => state.loginReducer);

  const { loading, products, error } = getallproductstate;
  const { currentUser } = loginReducer;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate("/catalog");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <motion.div
        className="boxhome"
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {!currentUser ? (
          <LoginScreen />
        ) : (
          <div className="pt-5 px-10 md:px-10 lg:px-10 xl:px-36">
            <div class="flex flex-col lg:flex-row  pb-5 items-center justify-between">
              <FadeIn delay={0.1} direction="right" fullwidth>
                <div class="flex pb-5 ">
                  <div class="bg-black text-white rounded-md px-2">
                    <h3>Каталог</h3>
                  </div>
                  <div class="pl-6 flex items-center">
                    <div class="bg-white px-2">
                      <h2 class="text-gray-800">Широкий выбор аудиотехники</h2>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <div class="flex justify-around underline decoration-gray-500 mt-4 lg:mt-0">
                  <Filter />
                </div>
              </motion.div>
            </div>

            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <div className="products-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Error error="Something went wrong..." />
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="shadow p-3 hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom bg-white rounded-xl"
                    >
                      <Product product={product} />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
