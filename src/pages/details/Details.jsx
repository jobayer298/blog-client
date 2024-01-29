import { useLoaderData } from "react-router-dom";

const Details = () => {
    const data = useLoaderData()
    return (
        <div>
            {data.title}
        </div>
    );
};

export default Details;