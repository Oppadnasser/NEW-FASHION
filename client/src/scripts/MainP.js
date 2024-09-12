import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Post from "./Post";

export default function MainP() {
  let [posts, setPosts] = useState(<></>);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products", { withCredentials: true })
      .then((res) => {
        const data = JSON.parse(res.request.response);
        const thePosts = data.map((element) => {
          return (
            <Post
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

    axios
      .get("http://localhost:3000/status", { withCredentials: true })
      .then((res) => {
        const hiddenItems = document.querySelectorAll(".hidden-content");
        hiddenItems.forEach((item) => {
          item.style.display = "block";
        });
        const showedItem = document.querySelector(".showed-content");
        showedItem.style.display = "none";
        if (res.request.response === "Admin") {
          const admin = document.querySelector(".admin-register-text");
          admin.style.display = "block";
        } else if (res.request.response === "Seller") {
          const Seller = document.querySelectorAll(".seller-content");
          Seller.forEach((item) => {
            item.style.display = "block";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="main-page">{posts}</div>;
}
