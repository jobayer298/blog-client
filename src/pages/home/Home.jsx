import { useState } from "react";
import Title from "../../component/title/Title";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaHeart, FaTrash } from "react-icons/fa";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const toggleFavorite = (item) => {
    const isFavorite = favorites.some((blog) => blog._id === item._id);
    const updatedBlog = { ...item };

    const updatedFavorites = isFavorite
      ? favorites.filter((blog) => blog._id !== item._id)
      : [...favorites, updatedBlog];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    fetch("https://blog-server-olive.vercel.app/allBlogs")
      .then((res) => res.json())
      .then((data) => setBlogData(data));
  }, []);
  const handleDelete = (id) => {
    fetch(`https://blog-server-olive.vercel.app/blog/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("blog deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const updateBlog = blogData.filter((item) => item._id !== id);
    setBlogData(updateBlog);
    localStorage.setItem("favorites", JSON.stringify(updateBlog));
  };
  console.log(blogData);
  return (
    <div className="container mx-auto my-10">
      <Title title="All Blog" />
      {blogData.length !== 0 ? (
        <table className="w-full bg-white border rounded-lg shadow-md text-sm mb-9">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {blogData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4 flex items-center gap-4 text-[17px] justify-center">
                  <Link to={`/details/${item._id}`}>
                    <FaEye className="text-blue-500" />
                  </Link>
                  <Link to={`/update/${item._id}`}>
                    <FaEdit />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 cursor-pointer"
                  />
                  <FaHeart
                    onClick={() => toggleFavorite(item)}
                    className={`cursor-pointer ${
                      favorites.some((favItem) => favItem._id === item._id)
                        ? "text-red-500"
                        : ""
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <h1 className="text-red-500 font-bold text-3xl text-center">
            there is no blog
          </h1>
          <Link to="/addBlog">
            <button className="py-3 px-7 rounded-md text-white font-bold bg-blue-600 mt-5">Add Blog</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
