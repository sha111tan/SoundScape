import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../redux/product.slice";

export default function Filter() {
  const [searchkey, setSearchKey] = useState("");
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  const handleFilter = () => {
    // Create an object to send as a payload to the filterProducts action
    dispatch(filterProducts({ searchKey: searchkey, sortKey: sort, category }));
  };

  return (
    <div>
      <div className="flex justify-center items-center rounded-xl shadow  mb-5 bg-white ">
        <div className="mr-2">
          <input
            value={searchkey}
            onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
            type="text"
            placeholder="Поиск"
            className="form-input focus:outline-none focus:ring-0 focus:border-transparent pl-2"
          />
        </div>
        <div className="mr-2">
          <select
            className="form-select "
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="htl">Сначала дорогие</option>
            <option value="lth">Сначала дешевые</option>
          </select>
        </div>
        <div className="mr-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="Наушники">Наушники</option>
            <option value="Плееры">Плееры</option>
            <option value="Акустика">Акустика</option>
            <option value="Винил">Винил</option>
          </select>
        </div>
        <div>
          <button
            className="text-white hover:scale-105 transition-transform duration-400 ease-in-out transition-timing-function-custom bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleFilter}
          >
            Фильтр
          </button>
        </div>
      </div>
    </div>
  );
}
