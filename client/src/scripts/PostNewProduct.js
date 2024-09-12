import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NewPost() {
  const [productInfo, setInfo] = useState({
    name: "",
    price: 0,
    photo: "",
    companyName: "",
    brand: "",
    shippingExpenses: 0,
    quantity: 0,
    evaluation: 0,
    evaluatorNumber: 0,
    description: "",
  });
  const navigate = useNavigate();
  const SendData = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/newProduct",
        { ...productInfo },
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/product-info", { state: { ...productInfo } });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          let message = "";
          for (let key in err.response.data.errors) {
            message += err.response.data.errors[key].msg + "\n";
          }
          alert(message);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div id="new-product-div">
      <form id="new-product">
        <h1 id="theHeader">Post New Prodcut</h1>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) =>
            setInfo({ ...productInfo, name: event.target.value })
          }
          placeholder="product name"
        />
        <label>Price</label>
        <input
          type="number"
          onChange={(event) =>
            setInfo({ ...productInfo, price: event.target.value })
          }
          placeholder="Price"
        />
        <label>Photo</label>
        <input
          type="text"
          onChange={(event) =>
            setInfo({ ...productInfo, photo: event.target.value })
          }
          placeholder="attach photo link"
        />
        <label>Company</label>
        <input
          type="text"
          onChange={(event) =>
            setInfo({ ...productInfo, companyName: event.target.value })
          }
          placeholder="your company name"
        />
        <label>Brand</label>
        <input
          type="text"
          onChange={(event) =>
            setInfo({ ...productInfo, brand: event.target.value })
          }
          placeholder="like HP , Dell,iphon...."
        />
        <label>Shipping Expenses</label>
        <input
          type="number"
          onChange={(event) =>
            setInfo({ ...productInfo, shippingExpenses: event.target.value })
          }
          placeholder="Shipping Expenses"
        />
        <label>Availabel Quantity</label>
        <input
          type="number"
          onChange={(event) =>
            setInfo({ ...productInfo, quantity: event.target.value })
          }
          placeholder="Quantity"
        />
        <label>Description</label>
        <textarea
          onChange={(event) =>
            setInfo({ ...productInfo, description: event.target.value })
          }
          placeholder="Descripe your product"
        ></textarea>
        <button id="post-new-product" onClick={SendData}>
          POST
        </button>
      </form>
    </div>
  );
}
