import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Rating } from "@smastrom/react-rating";
import { addProductReview } from "../redux/product.slice";

export default function Review({ product }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const sendReview = () => {
    if (localStorage.getItem("currentUser")) {
      let alreadyReviewed = false;

      for (let i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].user_id === currentUser.id) {
          alreadyReviewed = true;
        }
      }

      if (alreadyReviewed) {
        alert("You have already reviewed this product");
      } else {
        const review = {
          rating: rating,
          comment: comment,
        };
        console.log(review);
        dispatch(addProductReview({ review: review, productid: product.id }));
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="shadow p-3 mb-5 bg-white rounded mx-2">
      <h2 className={"mt-3 ml-3 text-2xl "}>Написать отзыв:</h2>

      <Rating
        className="text-black ml-3"
        style={{ maxWidth: 100 }}
        value={rating}
        initialRating={rating}
        onChange={setRating}
      />

      <input
        type="text"
        className="form-control pl-2 focus:outline-none focus:ring-0 focus:border-transparent mt-2 bg-gray-200 rounded-md  ml-3 md:w-96"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <button
        type="button"
        onClick={sendReview}
        className="text-white hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom mt-3 bg-black ml-3  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Опубликовать
      </button>

      <h2 className="mt-3 ml-2 text-2xl ">Отзывы:</h2>

      {product && product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review) => (
          <div className="mt-2 ml-1 text-left " key={review.id}>
            <Rating
              className=" mt-2 ml-1"
              style={{ maxWidth: 100 }}
              value={review.rating}
              readOnly={true}
            />
            <p className={" mb-3 pl-2 pt-2 pb-2 pr-2 text-justify"}>
              {review.comment}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <p className={""}>Отзывов на данный товар пока нет</p>
      )}
    </div>
  );
}
