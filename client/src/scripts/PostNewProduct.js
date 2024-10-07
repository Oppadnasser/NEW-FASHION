import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NewPost() {
  const [productInfo, setInfo] = useState({
    name: "",
    price: 0,
    photo: null,
    companyName: "",
    brand: "",
    shippingExpenses: 0,
    quantity: 0,
    evaluation: 0,
    evaluatorNumber: 0,
    description: "",
  });
  const navigate = useNavigate();
  const handlePhoto = (e) => {
    setInfo({ ...productInfo, photo: e.target.files[0] });
  };
  const SendData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("price", parseInt(productInfo.price));
    formData.append("quantity", parseInt(productInfo.quantity));
    formData.append("shippingExpenses", parseInt(productInfo.shippingExpenses));
    formData.append("evaluation", parseInt(productInfo.evaluation));
    formData.append("evaluatorNumber", parseInt(productInfo.evaluatorNumber));
    formData.append("description", productInfo.description);
    formData.append("companyName", productInfo.companyName);
    formData.append("brand", productInfo.brand);
    formData.append("photo", productInfo.photo); // Append the file (photo)
    try {
      await axios
        .post("http://localhost:3000/newProduct", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/product-info", {
            state: {
              ...productInfo,
              photo: `http://localhost:3000/${res.data}`,
            },
          });
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/status", { withCredentials: true })
      .then((res) => {
        const hiddenItems = document.querySelectorAll(".hidden-content");
        hiddenItems.forEach((item) => {
          item.style.display = "block";
        });
        const showedItem = document.querySelectorAll(".showed-content");
        showedItem.forEach((element) => {
          element.style.display = "none";
        });
        if (res.request.response === "Admin") {
          const admin = document.querySelector(".admin-register-text");
          admin.style.display = "block";
        } else if (res.request.response === "Seller") {
          const Seller = document.querySelectorAll(".seller-content");
          Seller.forEach((item) => {
            item.style.display = "inline";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="new-product-div">
      <form id="new-product" onSubmit={SendData}>
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
        <input type="file" name="photo" onChange={handlePhoto} />
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
        <button id="post-new-product" type="submit">
          POST
        </button>
      </form>
    </div>
  );
}
