import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Comments = ({ triggerRender, _id, setRender }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getCommentsFromLocalStorage = () => {
      const commentsInLocalStorage =
        JSON.parse(localStorage.getItem("comments")) || [];
      console.log("from local", commentsInLocalStorage);
      const filteredComments = commentsInLocalStorage.filter(
        (comment) => comment.blogID === _id
      );
      console.log("from local", filteredComments);
      setComments(filteredComments);
      console.log(_id);
    };
    const getCommentsFromDatabase = () => {
      fetch("https://blog-server-olive.vercel.app/comments")
        .then((res) => res.json())
        .then((data) => {
          console.log("from db", data);
          const filteredComments = data.filter(
            (comment) => comment.blogID === _id
          );
          setComments(filteredComments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    };

    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments && storedComments.length > 0) {
      getCommentsFromLocalStorage();
    } else {
      getCommentsFromDatabase();
    }
  }, [triggerRender, _id]);
  const handleDelete = (id) => {
    fetch(`https://blog-server-olive.vercel.app/comment/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("comment deleted");
          const getLocalComment =
            JSON.parse(localStorage.getItem("comments")) || [];
          const updateComment = getLocalComment.filter(
            (item) => item.commentID !== id
          );
          setComments(updateComment);
          setRender(true)
          console.log(updateComment, id);
          localStorage.setItem("comments", JSON.stringify(updateComment));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="my-14">
      <h1 className="font-bold text-3xl text-blue-500">
        Comments: {comments.length}
      </h1>
      <div className="my-5">
        {comments.map((comment) => (
          <div
            key={comment.email}
            className="mb-4 p-5 shadow-md space-y-3 w-1/2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {comment.name}
                <span className="text-sm font-normal">({comment.email})</span>
              </h3>
              <p className="flex items-center gap-2">
                <Link to={`/update/${comment._id}`}>
                  <FaEdit />
                </Link>
                <FaTrash
                  onClick={() => handleDelete(comment.commentID)}
                  className="text-red-500 cursor-pointer"
                />
              </p>
            </div>
            <p>
              <span className="font-medium">comment: </span>
              <span className="text-sm font-normal">{comment.comment}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
