import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function MyProduct(props) {
  const productInfo = {
    name: props["name"],
    describtion: props["description"],
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
  const review = () => {
    if (productInfo.evaluatorNumber >= 1000000) {
      return `${(productInfo.evaluatorNumber / 1000000).toFixed(0)} M+`;
    } else if (productInfo.evaluatorNumber >= 1000) {
      return `${(productInfo.evaluatorNumber / 1000).toFixed(0)} K+`;
    } else {
      return productInfo.evaluatorNumber;
    }
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
        <button className="post-update-button">update</button>
        <button className="post-delete-button">delete</button>
      </div>
      <div className="info-div">
        <img src={productInfo.logo} alt="" className="company-logo" />
        <Link to="/product-info" state={{ ...productInfo }}>
          <div className="add-picture-div">
            <img className="add-picture" src={productInfo.photo} alt="No" />
          </div>
        </Link>
        <p className="add-describtion">{productInfo.describtion}</p>

        <div className="rating-div">
          <h4>Reviews: {review()}</h4>
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
