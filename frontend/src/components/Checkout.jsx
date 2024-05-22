import StripeCheckout from "react-stripe-checkout";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/order.slice";
import { useEffect } from "react";

export default function Checkout({ amount }) {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const cartreducerstate = useSelector((state) => state.cartReducer);
  const { cartItems } = cartreducerstate;
  const user = localStorage.getItem("currentUser");

  const data = JSON.parse(user);

  const currentUser = {
    id: data.id,
    name: data.name,
    email: data.email,
    is_staff: data.is_staff,
    is_active: data.is_active,
  };

  const { placeOrderLoading, placeOrderSuccess, placeOrderError } = orderState;

  function tokenHandler(token) {
    console.log(cartItems);
    dispatch(
      placeOrder({
        token: token,
        cartItems: cartItems,
        currentUser: currentUser,
        subtotal: amount,
      })
    );
  }

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    console.log(amount);
  }, []);

  return (
    <div>
      {placeOrderLoading && <Loader />}
      {placeOrderSuccess && (
        <Success success="Your Order Placed Successfully" />
      )}
      {placeOrderError && <Error error={placeOrderError} />}
      <StripeCheckout
        token={tokenHandler}
        amount={amount * 100}
        shippingAddress
        currency="RUB"
        stripeKey="pk_test_51GMl3sHuRdGEFSeWbPR8J28xMmF9ORoSNZOlGjSipRL0RjRE4L24sdkbB4F3RpLqMAeCY73gM0FaACjld3sPfhxY00SfrT5z8h"
      >
        <button
          onClick={validate}
          className="text-white bg-black mt-5 hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom rounded-xl px-3 py-2"
        >
          Оплатить
        </button>
      </StripeCheckout>
    </div>
  );
}
