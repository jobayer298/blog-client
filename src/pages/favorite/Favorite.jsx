import { useState } from "react";
import Title from "../../component/title/Title";
import { FaTrash } from "react-icons/fa";

const Favorite = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const handleDelete = (id) => {
    const filterData = favorites.filter((blog) => blog._id !== id);
    setFavorites(filterData);
    localStorage.setItem("favorites", JSON.stringify(filterData));
  };
  return (
    <div className="container mx-auto">
      <Title title="Favorite blogs" />
      {favorites.length !== 0 ? (
        <table className="w-full bg-white border rounded-lg shadow-md text-sm mb-9">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {favorites.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4 flex items-center gap-4 text-[17px] justify-center">
                  <FaTrash
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-red-500 font-bold text-3xl text-center">
          there is no favorite blog
        </h1>
      )}
    </div>
  );
};

export default Favorite;
