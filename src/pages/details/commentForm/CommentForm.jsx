const CommentForm = ({ data, setRender }) => {
  const generateCommentID = () => {
    return Math.floor(Math.random() * 1000000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogID = data._id;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const comment = e.target.comment.value;
    const commentID = generateCommentID();
    const formData = { blogID, commentID, name, email, comment };
    console.log(formData);

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const commentsInLocalStorage =
          JSON.parse(localStorage.getItem("comments")) || [];
        commentsInLocalStorage.push(formData);
        localStorage.setItem(
          "comments",
          JSON.stringify(commentsInLocalStorage)
        );
        alert("comment added");
        setRender(true)
        e.target.reset();
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full shadow-lg p-10 space-y-3 border-[1px] border-gray-300 rounded-lg"
    >
      <h1 className="font-bold text-3xl mb-5 text-blue-500">
        give your opinion
      </h1>
      <div className="space-y-2">
        <label className="font-medium">Name</label>
        <input
          className="border-[1px] border-gray-500 rounded-md p-3 w-full"
          type="text"
          placeholder="your name"
          name="name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium">Email</label>
        <input
          className="border-[1px] border-gray-500 rounded-md p-3 w-full"
          type="email"
          placeholder="your email"
          name="email"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium">comment</label>
        <textarea
          className="border-[1px] border-gray-500 rounded-md p-3 w-full"
          name="comment"
          required
          rows="5"
          placeholder="write comment"
        ></textarea>
      </div>
      <div className="space-y-2">
        <input
          type="submit"
          value="comment"
          className="w-full py-3 cursor-pointer bg-blue-700 text-white font-bold rounded-md capitalize"
        />
      </div>
    </form>
  );
};

export default CommentForm;
