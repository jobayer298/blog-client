import Title from "../../component/title/Title";

const AddBlog = () => {
  const generateUserID = () => {
    return Math.floor(Math.random() * 1000000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const blog = e.target.blog.value;
    const userID = generateUserID();
    const formData = { title, blog, userID };
    console.log(formData);

    fetch("http://localhost:5000/allBlogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Blog Created");
        e.target.reset();
      });
  };
  return (
    <div className="container mx-auto h-screen">
      <Title title="add blog" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto shadow-lg p-10 space-y-3"
      >
        <div className="space-y-2">
          <label className="font-medium">Title</label>
          <input
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            type="text"
            placeholder="title of recipe"
            name="title"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">blog</label>
          <textarea
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            name="blog"
            required
            rows="5"
            placeholder="write blog"
          ></textarea>
        </div>
        <div className="space-y-2">
          <input
            type="submit"
            value="add update"
            className="w-full py-3 cursor-pointer bg-blue-700 text-white font-bold rounded-md capitalize"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
