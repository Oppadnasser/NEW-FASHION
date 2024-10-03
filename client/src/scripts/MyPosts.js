import { useEffect, useState } from "react";
import axios from "axios";
import MyProduct from "./MyProduct";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MyPosts() {
  const [showDeletePopup, setDeletePopup] = useState(false);
  const [successfuly, setSuccessfuly] = useState(false);
  const [showUpdatePopup, setUpdatePopup] = useState(false);
  const [myPosts, setPosts] = useState();
  const [thePhoto, setSelectedPhtot] = useState(null); // photo to delete popup
  const [toDeleteId, setIdToDelete] = useState(null);
  const [isHoverd, setHovered] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [fileAttached, setfile] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [oldPhoto, setOldPhoto] = useState("");

  const handelPostInfo = (info) => {
    //when update be clicked in any post
    setPostInfo(info);
    setUpdatePopup(true);
  };
  const handelDeleteClick = (link, id) => {
    setSelectedPhtot(link);
    setDeletePopup(true);
    setIdToDelete(id);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/MYproducts", { withCredentials: true })
      .then((res) => {
        const posts = JSON.parse(res.request.response);
        const thePosts = posts.map((element) => {
          return (
            <MyProduct
              id={element._id}
              name={element.name}
              description={element.description}
              price={element.price}
              evaluation={element.evaluation}
              evaluatorNumber={element.evaluatorNumber}
              quantity={element.quantity}
              photo={`http://localhost:3000/${element.photo}`}
              companyName={element.companyName}
              shippingExpenses={element.shippingExpenses}
              brand={element.brand}
              logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              onDeleteClicked={handelDeleteClick}
              handelSetInfo={handelPostInfo}
            />
          );
        });
        setPosts(thePosts);
        const hiddenItems = document.querySelectorAll(".hidden-content");
        hiddenItems.forEach((item) => {
          item.style.display = "block";
        });
        const showedItem = document.querySelectorAll(".showed-content");
        showedItem.forEach((element) => {
          element.style.display = "none";
        });
        const Seller = document.querySelectorAll(".seller-content");
        Seller.forEach((item) => {
          item.style.display = "inline";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const body = {
    id: toDeleteId,
    photo: thePhoto,
  };

  const changePhoto = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (e) => {
      setOldPhoto(postInfo.photo);
      setPostInfo({ ...postInfo, photo: e.target.result });
    };
    reader.readAsDataURL(file);
    setfile(true);
    setNewPhoto(file);
  };

  const deletePost = () => {
    try {
      axios
        .post("http://localhost:3000/delete/product", body, {
          withCredentials: true,
        })
        .then(() => {
          setDeletePopup(false);
          setSuccessfuly(true);
          setTimeout(() => {
            setSuccessfuly(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const update = (e) => {
    e.preventDefault();
    if (fileAttached) {
      const formData = new FormData();
      formData.append("name", postInfo.name);
      formData.append("price", parseInt(postInfo.price));
      formData.append("quantity", parseInt(postInfo.quantity));
      formData.append("shippingExpenses", parseInt(postInfo.shippingExpenses));
      formData.append("description", postInfo.description);
      formData.append("companyName", postInfo.companyName);
      formData.append("brand", postInfo.brand);
      formData.append("oldPhoto", oldPhoto);
      formData.append("newPhoto", newPhoto);
      formData.append("id", postInfo.id);
      axios
        .patch("http://localhost:3000/update/product", formData, {
          withCredentials: true,
        })
        .then((res) => {
          setPostInfo({
            ...postInfo,
            photo: `http://localhost:3000/${res.data}`,
          });
          setOldPhoto(`http://localhost:3000/${res.data}`);
          setfile(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .patch("http://localhost:3000/update/product", postInfo, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="my-posts-container">
      {myPosts}
      {showDeletePopup && (
        <div className="delete-product-popup">
          <div className="delete-question">
            <p>Are you sure to delte this Add?</p>
            <button
              className="delte-product-popup-button"
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => setHovered(false)}
              onClick={deletePost}
            >
              {isHoverd ? <i class="bi bi-trash"></i> : "Delete"}
            </button>
            <button
              className="cancel-product-popup-button"
              onClick={() => {
                setDeletePopup(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="div-image-delete-popup">
            <img className="image-delete-popup" src={thePhoto} alt="no"></img>
          </div>
        </div>
      )}
      {successfuly && (
        <div className="delete-product-successfuly-popup">
          Deleted successfuly
        </div>
      )}
      {showUpdatePopup && (
        <div className="update-post" id="update-post">
          <div className="update-post-content">
            <form id="update-post-form" className="update-post-form">
              <h2 className="update-post-h2">Update Post Info</h2>
              <br />

              <label id="update-label" className="update-label">
                Product Name
              </label>
              <input
                id="update-input-fname"
                className="update-input-fname"
                type="text"
                value={postInfo.name}
                onChange={(event) =>
                  setPostInfo({ ...postInfo, name: event.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Price
              </label>
              <input
                id="update-input-lname"
                className="update-input-lname"
                type="number"
                value={postInfo.price}
                onChange={(event) => {
                  setPostInfo({ ...postInfo, price: event.target.value });
                }}
              />

              <label id="update-label" className="update-label">
                Shipping Expenses
              </label>
              <input
                id="update-input-shipping"
                className="update-input-shipping"
                type="number"
                value={postInfo.shippingExpenses}
                onChange={(event) => {
                  setPostInfo({
                    ...postInfo,
                    shippingExpenses: event.target.value,
                  });
                }}
              />

              <label id="update-label" className="update-label">
                picture
              </label>
              <input
                id="update-input-address"
                className="update-input-address"
                type="file"
                onChange={(event) => {
                  changePhoto(event);
                }}
              />

              <label id="update-label" className="update-label">
                Describtion
              </label>
              <input
                id="update-input-email"
                className="update-input-email"
                type="text"
                value={postInfo.description}
                onChange={(event) => {
                  setPostInfo({ ...postInfo, description: event.target.value });
                }}
              />

              <label id="update-label" className="update-label">
                Quantity
              </label>
              <input
                id="update-input-password"
                className="update-input-password"
                type="text"
                value={postInfo.quantity}
                onChange={(event) => {
                  setPostInfo({ ...postInfo, quantity: event.target.value });
                }}
              />
              <label id="update-label" className="update-label">
                Company Name
              </label>
              <input
                id="update-input-password"
                className="update-input-Cname"
                type="text"
                value={postInfo.companyName}
                onChange={(event) => {
                  setPostInfo({ ...postInfo, companyName: event.target.value });
                }}
              />
              <label id="update-label" className="update-label">
                Brand
              </label>
              <input
                id="update-input-password"
                className="update-input-Cname"
                type="text"
                value={postInfo.brand}
                onChange={(event) => {
                  setPostInfo({ ...postInfo, brand: event.target.value });
                }}
              />
              <div>
                <button className="yes-update" onClick={update}>
                  Update
                </button>
                <button
                  className="cancel-update"
                  onClick={() => setUpdatePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="update-picture-div">
            <img
              src={postInfo.photo}
              className="update-product-img"
              alt="error"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
