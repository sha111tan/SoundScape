import Product from "../components/Product";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Error from "../components/Error";
import FadeIn from "../components/FadeIn";
import Loader from "../components/Loader";
import { getAllProducts } from "../redux/product.slice";
import ImageMarquee from "../components/ImageMarquee";
import LoginScreen from "./Login";
import "../App.css";

export default function HomeScreen() {
  const getallproductstate = useSelector((state) => state.productReducer);
  const loginReducer = useSelector((state) => state.loginReducer);

  const { loading, products, error, accuracy } = getallproductstate;
  const { currentUser } = loginReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = [
    { src: "apple.png", alt: "Brand 1" },
    { src: "alive.png", alt: "Brand 2" },
    { src: "sony.png", alt: "Brand 3" },
    { src: "yamaha.png", alt: "Brand 4" },
  ];

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div className="">
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
        <div className="">
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <div className="mb-5 bg-gradient-to-tr from-gray-600 to-black mx-4 sm:mx-5 mt-5 rounded-3xl p-6 sm:p-10">
              <div className="flex flex-col items-center justify-center md:mx-auto">
                <h1 className="text-white text-center px-5 pt-5 mt-8 sm:mt-12">
                  SOUND SCAPE
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <h1 className="text-center sm:text-center px-5 pb-5 text-transparent gradient-text animate-gradient">
                    AUDIOSTORE.
                  </h1>
                </div>

                <h4 className="text-center pb-8 sm:pb-10 text-white px-5">
                  Онлайн-магазин аудиотехники
                </h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-4 mx-2">
                  <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-0">
                    <Link to="/catalog">
                      <button className="rounded-xl hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom flex items-center gap-3 px-5 py-2 bg-white shadow-xl text-black">
                        Товары
                        <FaArrowRight className="mt-1" />
                      </button>
                    </Link>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/sha111tan?tab=repositories">
                      <button className="rounded-xl hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom shadow-xl px-5 py-2 bg-black text-white">
                        <FaGithub />
                      </button>
                    </a>
                    <a href="https://t.me/shaiiitan1">
                      <button className="rounded-xl hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom shadow-xl px-5 py-2 bg-black text-white">
                        <FaTelegram />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-10 md:px-10 lg:px-20 xl:px-40">
          <div className="py-10  flex items-center justify-between ">
            <FadeIn delay={0.1} direction="right" fullwidth>
              <div className="flex">
                <div className="bg-black text-white shadow-xl rounded-md px-2 ">
                  <h3 className="">Услуги</h3>
                </div>
                <div className="pl-6 flex items-center">
                  <div className="bg-white px-2">
                    <h2 className="dark:text-[#cccccc] light:text-[#0e0e0e]">
                      выбор услуг онлайн-магазина SoundScape
                    </h2>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left" fullwidth>
              <div className=" flex justify-around underline decoration-[#52525b] dark:decoration-[#d4d4d8] decoration-solid">
                <h3 className="text-[#52525b] dark:text-[#d4d4d8]">Services</h3>
              </div>
            </FadeIn>
          </div>
          <div className="flex"></div>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <div className="gap-3 py-8 md:flex grid">
              <div className="md:w-1/2">
                <Card
                  isFooterBlurred
                  className="rounded-3xl bg-background shadow-md h-[300px] w-full"
                >
                  <CardHeader className="absolute z-10 p-10 top-1 flex-col items-start">
                    <h4 className="text-white text-xl lg:text-3xl pb-1">
                      Широкий ассортимент
                    </h4>
                    <p className=" text-white/60 text-sm lg:text-lg  font-bold">
                      Мы предлагаем широкий выбор аудиооборудования: от
                      наушников и колонок до профессиональной звуковой техники,
                      чтобы каждый мог найти то, что подходит именно Вам!
                    </p>
                  </CardHeader>
                  <img
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="/img (7).jpg"
                  />
                </Card>
              </div>
              <div className="md:w-1/2 grid gap-3">
                <div className="flex w-full">
                  <Card
                    isFooterBlurred
                    className="w-full shadow-md bg-background rounded-3xl h-[150px]"
                  >
                    <CardHeader className="absolute p-5 z-10 top-1 flex-col items-start">
                      <h4 className="text-white/90 text-xl lg:text-xl pb-1 ">
                        Консультации экспертов
                      </h4>
                      <p className="text-sm lg:text-md text-white/60  font-bold">
                        Наши специалисты всегда готовы помочь вам выбрать
                        идеальное аудиооборудование, отвечая на ваши вопросы и
                        предоставляя рекомендации.
                      </p>
                    </CardHeader>
                    <img
                      alt="Relaxing app background"
                      className="z-0 w-full h-full object-cover"
                      src="/img (8).jpg"
                    />
                  </Card>
                </div>
                <div className="grid sm:flex gap-3">
                  <Card className="bg-background rounded-3xl shadow-md h-[140px] w-full sm:w-1/2">
                    <CardHeader className="absolute z-10 top-1 p-5 flex-col !items-start">
                      <h4 className="text-white text-sm lg:text-xl pb-1">
                        Быстрая доставка
                      </h4>
                      <p className="text-sm lg:text-md text-white/60  font-bold">
                        Быстрая и надежная доставка.
                      </p>
                    </CardHeader>
                    <img
                      alt="Card background"
                      className="z-0 w-full h-full object-cover"
                      src="/img (6).jpg"
                    />
                  </Card>
                  <Card className="bg-background rounded-3xl shadow-md h-[140px] w-full sm:w-1/2">
                    <CardHeader className="absolute z-10 top-1 p-5 flex-col !items-start">
                      <h4 className="text-white text-sm lg:text-xl pb-1">
                        Гарантия
                      </h4>
                      <p className="text-sm lg:text-md text-white/60  font-bold">
                        Гарантия на всю продукцию.
                      </p>
                    </CardHeader>
                    <img
                      alt="Card background"
                      className="z-0 w-full h-full object-cover"
                      src="/img (9).jpg"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="px-10 md:px-10 lg:px-20 xl:px-40">
          <div className="py-10  flex items-center justify-between ">
            <FadeIn delay={0.1} direction="right" fullwidth>
              <div className="flex">
                <div className="bg-black text-white shadow-xl rounded-md px-2 ">
                  <h3 className="">Бренды</h3>
                </div>
                <div className="pl-6 flex items-center">
                  <div className="bg-white px-2">
                    <h2 className="dark:text-[#cccccc] light:text-[#0e0e0e]">
                      аудиосистемы от известных брендов
                    </h2>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left" fullwidth>
              <div className=" flex justify-around underline decoration-[#52525b] dark:decoration-[#d4d4d8] decoration-solid">
                <h3 className="text-[#52525b] dark:text-[#d4d4d8]">brands</h3>
              </div>
            </FadeIn>
          </div>

          <div className="flex"></div>
          <ImageMarquee images={images} />
        </div>
      </motion.div>
    </div>
  );
}
