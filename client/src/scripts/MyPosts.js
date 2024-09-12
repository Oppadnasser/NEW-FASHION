import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import MyProduct from "./MyProduct";

export default function MyPosts() {
  const navigate = useNavigate();
  const [myPosts, setPosts] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/MYproducts", { withCredentials: true })
      .then((res) => {
        const posts = JSON.parse(res.request.response);
        const thePosts = posts.map((element) => {
          return (
            <MyProduct
              name={element.name}
              description={element.description}
              price={element.price}
              evaluation={element.evaluation}
              evaluatorNumber={element.evaluatorNumber}
              quantity={element.quantity}
              photo={element.photo}
              companyName={element.companyName}
              ShippingExpenses={element.shippingExpenses}
              logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            />
          );
        });
        setPosts(thePosts);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div className="my-posts-container">{myPosts}</div>;
}
