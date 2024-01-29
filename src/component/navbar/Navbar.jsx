import { Link } from "react-router-dom";

const Navbar = () => {
  const data = [
    { text: "home", url: "/" },
    { text: "add blog", url: "/addBlog" },
    { text: "favorite", url: "/favorite" },
  ];
  return (
    <div className="bg-slate-100 shadow-sm py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          Blogs
        </Link>
        <ul className="flex items-center gap-5">
          {data.map((item, index) => (
            <li
              key={index}
              className="font-medium capitalize transition-all hover:text-primary"
            >
              <Link to={item.url}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
