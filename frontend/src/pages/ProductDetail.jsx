import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cart.slice";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Review from "../components/Review";
import { getProductById } from "../redux/product.slice";
import FadeIn from "../components/FadeIn";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cartError, setCartError] = useState("");
  const productState = useSelector((state) => state.productReducer);
  const { product, loading, error } = productState;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const addCart = () => {
    const parsedQuantity = parseInt(quantity);
    if (
      isNaN(parsedQuantity) ||
      parsedQuantity <= 0 ||
      parsedQuantity > product?.countInStock
    ) {
      setCartError("Invalid quantity");
      return;
    }
    dispatch(addItemToCart({ product, quantity: parsedQuantity }));
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-10 mb-5 px-4 sm:px-6 lg:px-8">
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
        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {product && (
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md p-5">
              <div className="md:w-1/2 flex justify-center items-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-48 object-contain sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96"
                />
              </div>
              <div className="flex-1 md:pl-8 mt-4 md:mt-0">
                <h1 className="text-xl xl:text-2xl font-medium mb-1">
                  {product.title}
                </h1>
                <p className="text-lg xl:text-xl mb-5 font-bold">
                  {product.name}
                </p>
                <div className=" flex flex-col sm:flex-row gap-10 items-center">
                  <p className="font-bold text-4xl mb-2 sm:mb-0">
                    {product.price} ₽
                  </p>
                  {product.countInStock > 0 ? (
                    <button
                      className="bg-black hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom text-white py-2 px-4 rounded-xl mt-4 sm:mt-0"
                      onClick={addCart}
                    >
                      В корзину
                    </button>
                  ) : (
                    <div className="text-center">
                      <h1 className="text-red-500">Out of Stock</h1>
                      <button
                        className="bg-gray-300 hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                        disabled
                      >
                        В корзину
                      </button>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "description"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("description")}
                      >
                        Описание
                      </button>
                      <button
                        className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "reviews"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("reviews")}
                      >
                        Отзывы
                      </button>
                    </nav>
                  </div>

                  {/* Tab content */}
                  <div className="mt-4">
                    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
                      {activeTab === "description" && (
                        <div>
                          <p className="text-justify">{product.description}</p>
                        </div>
                      )}
                      {activeTab === "reviews" && (
                        <div>
                          <Review product={product} />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        {cartError && <Error error={cartError} />}
      </motion.div>
    </div>
  );
}
