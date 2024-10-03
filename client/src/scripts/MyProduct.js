import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyProduct(props) {
  const productInfo = {
    name: props["name"],
    description: props["description"],
    price: props["price"],
    logo: props["logo"],
    evaluation: props["evaluation"],
    evaluatorNumber: props["evaluatorNumber"],
    quantity: props["quantity"],
    photo: props["photo"],
    companyName: props["companyName"],
    shippingExpenses: props["shippingExpenses"],
    id: props["id"],
    brand: props["brand"],
  };
  const onDeleteClicked = props["onDeleteClicked"];
  const onUpdateClicked = props["handelSetInfo"];
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const Style = {
    color: productInfo.quantity < 10 ? "red" : "black",
  };
  let shipping = productInfo.shippingExpenses.toFixed(2);

  const starPercentage = (productInfo.evaluation / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  const review = () => {
    if (productInfo.evaluatorNumber >= 1000000) {
      return `${(productInfo.evaluatorNumber / 1000000).toFixed(0)} M+`;
    } else if (productInfo.evaluatorNumber >= 1000) {
      return `${(productInfo.evaluatorNumber / 1000).toFixed(0)} K+`;
    } else {
      return productInfo.evaluatorNumber;
    }
  };

  const handelDeleteClicking = () => {
    onDeleteClicked(productInfo.photo, productInfo.id);
  };
  const handelUpdateClicking = () => {
    onUpdateClicked(productInfo);
  };
  return (
    <div className="add-container">
      <div className="post-info">
        <p className="post-date">Posted in:</p>
        <br />
        <p className="last-update">Last update:</p>
        <br />
        <p>views:</p>
        <br />
        {/* <Link to={"/updateProductInfo"} state={{ ...productInfo }}> */}
        <button className="post-update-button" onClick={handelUpdateClicking}>
          update
        </button>
        {/* </Link> */}
        <button className="post-delete-button" onClick={handelDeleteClicking}>
          delete
        </button>
      </div>
      <div className="info-div">
        <img src={productInfo.logo} alt="" className="company-logo" />
        <Link to="/product-info" state={{ ...productInfo }}>
          <div className="add-picture-div">
            <img className="add-picture" src={productInfo.photo} alt="No" />
          </div>
        </Link>
        <h4 className="add-name">{productInfo.name}</h4>
        <p className="add-description">
          {productInfo.description.slice(0, 60)}
        </p>

        <div className="rating-div">
          <h5>Reviews: {review()}</h5>
          <div className="stars-outer">
            <div
              className="stars-inner"
              style={{ width: starPercentageRounded }}
            ></div>
          </div>
        </div>
        <br />
        <h3 className="add-price">{numberWithCommas(productInfo.price)} eg</h3>
        <p className="add-remaining" style={Style}>
          remaining {productInfo.quantity}
        </p>
        <p className="add-shipping">shipping expenses {shipping} eg</p>
      </div>
    </div>
  );
}
