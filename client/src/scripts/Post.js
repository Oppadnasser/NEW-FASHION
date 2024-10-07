import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post(props) {
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
    ShippingExpenses: props["ShippingExpenses"],
  };

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const Style = {
    color: productInfo.quantity < 10 ? "red" : "black",
  };
  let shipping = productInfo.ShippingExpenses.toFixed(2);
  const starPercentage = (productInfo.evaluation / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return (
    <div className="post">
      <img src={productInfo.logo} alt="" className="company-logo" />
      <Link to="/product-info" state={{ ...productInfo }}>
        <div className="product-picture-div">
          <img className="product-picture" src={productInfo.photo} alt="No" />
        </div>
      </Link>
      <h3>{productInfo.name}</h3>
      <p className="description">{productInfo.description.slice(0, 40)}</p>
      <div className="stars-outer">
        <div
          className="stars-inner"
          style={{ width: starPercentageRounded }}
        ></div>
      </div>
      <h3 className="price">{numberWithCommas(productInfo.price)} eg</h3>
      <p className="remaining" style={Style}>
        remaining {productInfo.quantity}
      </p>
      <p className="shipping">shipping expenses {shipping} eg</p>
    </div>
  );
}
