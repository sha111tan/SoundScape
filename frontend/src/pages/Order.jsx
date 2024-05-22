import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getOrdersByUserId } from "../redux/order.slice";
import "../App.css";
export default function OrderScreen() {
  const orderState = useSelector((state) => state.orderReducer);

  const { orders, getOrdersByUserIdError, getOrdersByUserIdLoading } =
    orderState;

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser) {
      dispatch(getOrdersByUserId(currentUser.id));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

  return (
    <div>
      <div className="flex px-10 md:px-40 justify-center mt-5 ">
        <div className=" mt-5">
          <div className="flex justify-between mb-5">
            <div className="flex">
              <div className="bg-black text-white shadow-xl rounded-md px-2 ">
                <h3 className="">Заказы</h3>
              </div>
              <div className="pl-6 flex items-center">
                <div className="bg-white px-2">
                  <h2 className="dark:text-[#cccccc] light:text-[#0e0e0e]">
                    ваша заказы
                  </h2>
                </div>
              </div>
            </div>

            <div className=" flex justify-around underline decoration-[#52525b] dark:decoration-[#d4d4d8] decoration-solid">
              <h3 className="text-[#52525b] dark:text-[#d4d4d8]">orders</h3>
            </div>
          </div>
          <table className="orderTable">
            <thead>
              <tr>
                <th>ID заказа</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>ID транзакции</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {getOrdersByUserIdLoading && <Loader />}
              {orders &&
                orders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      onClick={() => {
                        window.location = `/orderinfo/${order.id}`;
                      }}
                    >
                      <td>{order.id}</td>
                      <td>{order.orderAmount}</td>
                      <td>{order.created_at.substring(0, 10)}</td>
                      <td>{order.transactionId}</td>
                      <td>
                        {order.isDelivered ? (
                          <p className="md:text-xl font-semibold">
                            Товар доставлен
                          </p>
                        ) : (
                          <p className="md:text-xl font-semibold">
                            Товар в пути
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {getOrdersByUserIdError && <Error error="something went wrong" />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
