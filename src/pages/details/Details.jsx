import { useLoaderData } from "react-router-dom";
import Title from "../../component/title/Title";
import CommentForm from "./commentForm/CommentForm";
import Comments from "./comments/Comments";
import { useState } from "react";

const Details = () => {
  const data = useLoaderData();
  console.log(data);
  const [triggerRender, setRender] = useState(false)
  return (
    <div className="w-3/4 mx-auto">
      <Title title="blog" />
      <div className="space-y-4">
        <h1>
          <span className="text-3xl font-bold">Title: </span>
          <span className="text-lg text-gray-600 font-medium">
            {data.title}
          </span>
        </h1>
        <p>
          <span className="text-3xl font-bold">Description: </span>
          <span className="text-lg text-gray-600 font-medium">{data.blog}</span>
        </p>
      </div>
      <Comments
        _id={data?._id}
        setRender={setRender}
        triggerRender={triggerRender}
      />
      <CommentForm
        triggerRender={triggerRender}
        setRender={setRender}
        data={data}
      />
    </div>
  );
};

export default Details;
