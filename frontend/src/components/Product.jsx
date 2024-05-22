import { Link } from "react-router-dom";
import { Rating, Star } from "@smastrom/react-rating";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

export default function Product({ product }) {
  return (
    <Link to={`product/${product.id}`} className="flex flex-col h-full">
      <div className="flex flex-col flex-1 text-center mx-2 md:mx-5 justify-between">
        <div className="flex flex-col flex-1 justify-center">
          <div className="h-32 w-32 md:h-40 md:w-40  mx-auto rounded-xl shadow-md text-center">
            <img
              src={product.image}
              className="w-full rounded-xl object-contain h-full py-2 md:py-3 lg:py-5 mx-auto"
              alt={product.name}
            />
          </div>
          <div className="mt-2 md:mt-5">
            <p className="text-sm md:text-md font-semibold h-12 md:h-16 overflow-hidden">
              {product.name}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-1 md:mt-2">
          <Rating
            value={product.rating}
            readOnly={true}
            itemStyles={myStyles}
            style={{ maxWidth: 100 }}
          />
        </div>

        <div className="rounded-xl py-1 bg-black mt-2 md:my-2">
          <p className="text-center text-white text-xs md:text-sm font-semibold">
            {product.price} ₽
          </p>
        </div>
      </div>
    </Link>
  );
}
